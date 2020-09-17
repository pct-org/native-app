import React from 'react'
import { InteractionManager, StyleSheet, View } from 'react-native'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'
import AsyncStorage from '@react-native-community/async-storage'

import withDownloadManager from 'modules/DownloadManager/withDownloadManager'
import withApollo from 'modules/GraphQL/withApollo'
import withIpFinder from 'modules/IpFinder/withIpFinder'
import PlayerManager from 'modules/PlayerManager'
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
export default class MobilePlayerManager extends PlayerManager {

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

    // Do the same as the parent
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      this.start()
    })
  }

  componentWillUnmount() {
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

    // Do the same as the parent
    this.stop()
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

  handleCastMediaProgressUpdate = ({ mediaProgress: { duration, progress: currentTime } }) => {
    const progress = parseFloat((currentTime / duration), 10)

    this.handleSetProgress({ currentTime, duration, progress })
  }

  handleCastMediaPlaybackEnded = (...a) => {
    console.log('handleMediaPlaybackEnded', a)
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

  getChildProps = () => {
    const { casting, mediaUrl, startPosition } = this.state
    const { download, isBuffering } = this.state

    return {
      casting,
      mediaUrl,
      startPosition,
      download,
      isBuffering,
      renderCastButton: this.renderCastButton,
      setProgress: this.handleSetProgress,
    }
  }

}
