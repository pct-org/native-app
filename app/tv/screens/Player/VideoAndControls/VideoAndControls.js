import React from 'react'
import { StyleSheet, TVEventHandler, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'

import VlcPlayer from 'components/VlcPlayer'
import Overlay from 'components/Overlay'

import PlayPauseIcon from './PlayPauseIcon'
import SeekBar from './SeekBar'

const styles = StyleSheet.create({

  listContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 800,
  },

  actionsContainer: {
    position: 'absolute',
    bottom: dimensions.UNIT * 3,
    left: dimensions.UNIT * 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 76
  }

})

// TODO:: Do same as with PlayerManager, this one in components folder
export class VideoAndControls extends React.Component {

  videoRef

  controlsTimer = null

  constructor(props) {
    super(props)

    this.today = Date.now()

    this.state = {
      showControls: true,
      loading: true,
      paused: false,
      resizeMode: 'contain',
      currentTime: 0,
    }
  }

  componentDidMount() {
    this.toggleControls()

    this._tvEventHandler = new TVEventHandler()
    this._tvEventHandler.enable(this, (manager, evt) => {
      const { paused } = manager.state

      if (evt.eventType === 'playPause' && evt.eventKeyAction === 0) {
        if (paused) {
          this.handlePlayVideo()

        } else {
          this.handlePauseVideo()
        }
      }
    })
  }

  componentWillUnmount() {
    this._tvEventHandler?.disable()
  }

  handlePauseVideo = () => {
    const { paused } = this.state

    if (paused) {
      return
    }

    this.setState({
      paused: true,

    }, () => {
      this.toggleControls(false)
    })
  }

  handlePlayVideo = () => {
    this.setState({
      paused: false,

    }, () => {
      this.toggleControlsOff()
    })
  }

  handleOnPlaying = ({ duration }) => {
    const { startPosition } = this.props
    const { loading: wasLoading } = this.state

    this.setState({
      duration,
      loading: false,
    }, () => {
      // If start position is bigger then 0 and it was loading then seek to it
      if (startPosition > 0 && wasLoading) {
        this.videoRef.seek((duration / 100) * startPosition)
      }
    })
  }

  handleOnProgress = ({ currentTime, duration }) => {
    const { setProgress } = this.props

    const currentTimeSeconds = currentTime / 1000
    const durationSeconds = duration / 1000

    const progress = parseFloat((currentTimeSeconds / durationSeconds), 10)

    this.setState({
      currentTime,
      duration,
      progress,
    }, () => {
      setProgress({
        currentTime: currentTimeSeconds,
        duration: durationSeconds,
        progress,
      })
    })
  }

  handleResizeModeChange = (resizeMode) => {
    this.setState({
      resizeMode,
    })
  }

  toggleControls = (withTimeout = true) => {
    const { showControls } = this.state

    if (this.controlsTimer) {
      clearTimeout(this.controlsTimer)
    }

    if (showControls === true) {
      if (withTimeout) {
        return this.toggleControlsOff()
      }

      return
    }

    this.setState({
      showControls: true,
    }, () => {
      if (withTimeout) {
        return this.toggleControlsOff()
      }
    })
  }

  toggleControlsOff = () => {
    const { showControls, paused } = this.state

    if (!showControls || paused) {
      return
    }

    this.controlsTimer = setTimeout(() => {
      this.setState({
        showControls: false,
      })
    }, 4000)
  }

  render() {
    const { url, children, forcePaused } = this.props
    const { resizeMode } = this.state
    const { showControls, paused } = this.state
    const { currentTime, duration, progress } = this.state

    return (
      <React.Fragment>
        {url && (
          <Animatable.View
            duration={constants.ANIMATION_DURATIONS.enteringScreen}
            style={styles.listContainer}
            animation={'fadeIn'}
            pointerEvents={'box-none'}
            useNativeDriver>
            <VlcPlayer
              ref={(ref) => this.videoRef = ref}
              source={{
                uri: url,
                autoplay: true,
              }}
              style={styles.video}
              paused={paused || forcePaused}
              resizeMode={resizeMode}
              onPlaying={this.handleOnPlaying}
              onProgress={this.handleOnProgress}
            />
          </Animatable.View>
        )}

        {duration && (
          <Animatable.View
            duration={
              showControls
                ? constants.ANIMATION_DURATIONS.enteringScreen
                : constants.ANIMATION_DURATIONS.leavingScreen
            }
            style={styles.listContainer}
            animation={showControls ? 'fadeIn' : 'fadeOut'}
            pointerEvents={'box-none'}
            useNativeDriver>

            <View style={styles.actionsContainer}>
              <PlayPauseIcon
                handlePlayVideo={this.handlePlayVideo}
                handlePauseVideo={this.handlePauseVideo}
                paused={paused}
              />

              <SeekBar
                currentTime={currentTime}
                duration={duration}
                progress={progress}
                onSeek={this.onSliderPositionChange}
              />
            </View>

            {children}

            <Overlay variant={'dark'} />

          </Animatable.View>
        )}

      </React.Fragment>
    )
  }
}

export default VideoAndControls
