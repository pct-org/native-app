import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, InteractionManager } from 'react-native'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'
import AsyncStorage from '@react-native-community/async-storage'

import withDownloadManager from 'modules/DownloadManager/withDownloadManager'
import withApollo from 'modules/GraphQL/withApollo'
import { progressMutation } from 'modules/GraphQL/ProgressGraphQL'
import { StartStreamMutation, StopStreamMutation } from 'modules/GraphQL/DownloadGraphQL'
import withIpFinder from 'modules/IpFinder/withIpFinder'
import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import constants from 'modules/constants'

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    zIndex: 2000,
    width: dimensions.ICON_CAST_SIZE,
    height: dimensions.ICON_CAST_SIZE,
  },

  castButton: {
    width: dimensions.ICON_CAST_SIZE,
    height: dimensions.ICON_CAST_SIZE,
    tintColor: colors.PRIMARY_COLOR_200,
  },

})

@withDownloadManager
@withIpFinder
@withApollo
export default class PlayerManager extends React.Component {

  constructor(props) {
    super(props)

    const { ipFinder, item } = props

    this.state = {
      mediaUrl: `http://${ipFinder.host}/watch/${item._id}`,
      progress: 0,
      casting: false,
      isBuffering: true,
      download: null,
      lastProgressSend: 0,
      startPosition: item.watched.progress === 100
        ? 0
        : item.watched.progress,
    }
  }

  componentDidMount() {
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, this.handleCastSessionStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, this.handleCastSessionEnded)
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED, this.handleCastMediaPlaybackStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED, this.handleCastMediaProgressUpdate)
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_ENDED, this.handleCastMediaPlaybackEnded)

    GoogleCast.getCastState().then((state) => {
      if (state.toLowerCase() === 'connected') {
        this.setState({
          casting: true,
        })
      }
    })

    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Start the stream
      this.startStream().then(() => {
        this.pollDownload()
      })
    })
  }

  componentWillUnmount() {
    const { downloadManager, item } = this.props
    const { casting } = this.state

    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_ENDED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_PLAYBACK_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_PROGRESS_UPDATED)

    if (casting) {
      // Stop casting but keep the connection
      GoogleCast.stop()
    }

    Orientation.lockToPortrait()

    // Stop polling for the download info
    downloadManager.stopPollDownload(item)

    // Stop the stream
    this.stopStream()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isBuffering: wasBuffering } = prevState
    const { isBuffering } = this.state

    if (wasBuffering && !isBuffering) {
      // Buffering is done, check if we need to cast it
      this.handleStartCasting()
    }
  }

  handleStartCasting = (force = false) => {
    const { item, ipFinder } = this.props
    const { casting, mediaUrl, download } = this.state

    if (force || casting) {
      Orientation.lockToPortrait()

      GoogleCast.castMedia({
        title: (
          item.type === 'episode'
            ? `${item.show.title}: ${item.title}`
            : item.title
        ),
        subtitle: item.synopsis,
        mediaUrl: `${mediaUrl}?device=chromecast`,
        posterUrl: item.type === 'episode'
          ? item.show.images.poster.high
          : item.images.poster.high,

        // Add all available subtitles
        tracks: download.subtitles.map(subtitle => ({
          id: `http://${ipFinder.host}/subtitle/${item._id}/${subtitle.code}`,
          title: subtitle.language,
          language: subtitle.code,
        })),

        textTrackStyle: {
          foregroundColor: '#FFFFFFFF',
          backgroundColor: '#01000000',
          edgeType: 'outline',
          edgeColor: '#000000',
          windowType: 'none',
          fontGenericFamily: 'sansSerif',
        },
      })
    }
  }

  handleCastSessionStarted = () => {
    const { progress } = this.state

    this.setState({
      casting: true,
      startPosition: parseFloat(`${progress * 100}`).toFixed(2),
    }, () => {
      this.handleStartCasting(true)
    })
  }

  handleCastSessionEnded = (error) => {
    const { progress } = this.state

    this.setState({
      casting: false,
      startPosition: parseFloat(`${progress * 100}`).toFixed(2),
    })
  }

  handleCastMediaPlaybackStarted = async({ mediaStatus }) => {
    const { startPosition } = this.state

    if (mediaStatus?.streamDuration && startPosition) {
      GoogleCast.seek(mediaStatus?.streamDuration * (startPosition / 100))
    }

    const defaultSubtitleCode = await AsyncStorage.getItem(constants.KEY_DEFAULT_SUBTITLE)

    // If the default subtitle is not null then select it
    if (defaultSubtitleCode !== null) {
      await GoogleCast.toggleSubtitles(true, defaultSubtitleCode)
    }
  }

  handleCastMediaPlaybackEnded = (...a) => {
    console.log('handleMediaPlaybackEnded', a)
  }

  handleCastMediaProgressUpdate = ({ mediaProgress: { duration, progress: currentTime } }) => {
    const progress = parseFloat((currentTime / duration), 10)

    this.handleSetProgress({ currentTime, duration, progress })
  }

  handleSetProgress = ({ currentTime, duration, progress }) => {
    const { lastProgressSend } = this.state

    let newLastProgressSend = lastProgressSend

    // We don't want to spam the graph api
    if ((lastProgressSend + 0.001) < progress) {
      const progressToSend = parseFloat(`${progress * 100}`).toFixed(2)

      newLastProgressSend = progress

      // After 95 we don't update anymore
      if (progressToSend > 95) {
        newLastProgressSend = 100
      }

      this.doProgressUpdateMutation(progressToSend)
    }

    this.setState({
      currentTime,
      duration,
      progress,
      lastProgressSend: newLastProgressSend,
    })
  }

  /**
   * Does the start stream mutation
   *
   * @returns {Promise<void>}
   */
  startStream = async() => {
    const { apollo, item, torrent } = this.props

    return await apollo.mutate({
      mutation: StartStreamMutation,
      variables: {
        _id: item._id,
        itemType: item.type,
        torrentType: torrent.type || undefined,
        quality: torrent.quality,
      },
    })
  }

  /**
   * Does the stop stream mutation
   *
   * @returns {Promise<void>}
   */
  stopStream = async() => {
    const { apollo, item } = this.props

    await apollo.mutate({
      mutation: StopStreamMutation,
      variables: {
        _id: item._id,
      },
    })
  }

  pollDownload = () => {
    const { downloadManager, item } = this.props

    downloadManager.pollDownload(item, (data) => {
      // If the progress is 100 then stop polling
      if (data.progress === 100) {
        downloadManager.stopPollDownload(item)
      }

      this.setState({
        isBuffering: data.progress < 3,
        download: data,
      })
    })
  }

  doProgressUpdateMutation = async(progress) => {
    const { apollo, item } = this.props

    await apollo.mutate({
      mutation: progressMutation,
      variables: {
        _id: item._id,
        type: item.type,
        progress: parseFloat(progress),
      },
    })
  }

  renderCastButton = (style = {}) => {
    return (
      <View
        style={[styles.container, style]}
        pointerEvents={'box-none'}>
        <CastButton style={styles.castButton} />
      </View>
    )
  }

  render() {
    const { style, children } = this.props
    const { casting, mediaUrl, startPosition } = this.state
    const { download, isBuffering } = this.state

    return (
      <View style={style}>

        {children({
          casting,
          mediaUrl,
          startPosition,
          download,
          isBuffering,
          renderCastButton: this.renderCastButton,
          setProgress: this.handleSetProgress,
        })}

      </View>
    )
  }
}
