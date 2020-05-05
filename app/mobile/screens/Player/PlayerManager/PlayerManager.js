import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'

import withApollo from 'modules/GraphQL/withApollo'
import { progrssMutation } from 'modules/GraphQL/ProgressGraphQL'
import withIpFinder from 'modules/IpFinder/withIpFinder'
import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isBuffering: wasBuffering } = prevProps
    const { isBuffering } = this.props

    if (wasBuffering && !isBuffering) {
      // Buffering is done, check if we need to cast it
      this.handleStartCasting()
    }
  }

  handleStartCasting = (force = false) => {
    const { item } = this.props
    const { casting, mediaUrl } = this.state

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
        // TODO:: Check this, not always working
        posterUrl: item.type === 'episode'
          ? item.show.images.poster.high
          : item.images.poster.high,
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

  handleCastMediaPlaybackStarted = ({ mediaStatus}) => {
    const { startPosition } = this.state

    if (mediaStatus?.streamDuration && startPosition) {
      GoogleCast.seek(mediaStatus?.streamDuration * (startPosition / 100))
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

  doProgressUpdateMutation = async(progress) => {
    const { apollo, item } = this.props

    await apollo.mutate({
      variables: {
        _id: item._id,
        type: item.type,
        progress: parseFloat(progress),
      },
      mutation: progrssMutation,
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

    return (
      <View style={style}>

        {children({
          casting,
          mediaUrl,
          startPosition,
          renderCastButton: this.renderCastButton,
          setProgress: this.handleSetProgress,
        })}

      </View>
    )
  }
}
