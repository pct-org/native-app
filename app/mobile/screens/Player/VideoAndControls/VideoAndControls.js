import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Orientation from 'react-native-orientation'

import dimensions from 'modules/dimensions'
import VlcPlayer from 'components/VlcPlayer'
import Overlay from 'components/Overlay'

import PlayPauseIcon from './PlayPauseIcon'
import SeekBar from './SeekBar'
import SelectSubtitle from './SelectSubtitle'

const styles = StyleSheet.create({

  listContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },

  contentContainerStyle: {
    flexGrow: 1,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 800,
  },

  slider: {
    position: 'absolute',
    left: 16,
    bottom: 64,
    right: 16,
    zIndex: 1001,
  },

  placeholderStyle: {
    width: (dimensions.SCREEN_HEIGHT + dimensions.ON_SCREEN_NAVIGATION_HEIGHT),
    height: (dimensions.SCREEN_WIDTH),
    opacity: 0,
    zIndex: 1500,
  },

})

export class VideoAndControls extends React.Component {

  videoRef

  controlsTimer = null

  constructor(props) {
    super(props)

    this.today = Date.now()

    this.state = {
      showControls: true,
      isPortrait: Orientation.getInitialOrientation() === 'PORTRAIT',
      loading: true,
      paused: false,
      resizeMode: 'contain', // 'contain', 'cover', null, 'stretch'
      currentTime: 0,
      duration: 0,
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientationChange)
    Orientation.lockToLandscape()
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.handleOrientationChange)
  }

  handleOrientationChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      this.setState({
        isPortrait: false,
      })

      this.videoRef.presentFullscreenPlayer()

    } else if (orientation === 'PORTRAIT') {
      this.setState({
        isPortrait: true,
      })

      this.videoRef.dismissFullscreenPlayer()
    }
  }

  onSliderPositionChange = (position) => {
    this.setState({
      progress: position,

    }, () => {
      this.videoRef.seek(position)
    })
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

      this.toggleControls()
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

    } else {
      this.setState({
        showControls: true,
      }, () => {
        if (withTimeout) {
          this.toggleControlsOff()
        }
      })
    }
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
    const { url, children, forcePaused, subtitleUri, selectSubtitle, subtitles } = this.props
    const { isPortrait, resizeMode } = this.state
    const { showControls, paused, loading } = this.state
    const { currentTime, duration, progress } = this.state

    // Wait until we are in landscape
    if (isPortrait) {
      return null
    }

    return (
      <React.Fragment>
        {url && (
          <VlcPlayer
            ref={(ref) => {
              this.videoRef = ref
            }}
            source={{
              uri: url,
              autoplay: true,
            }}
            subtitleUri={subtitleUri}
            style={styles.video}
            paused={paused || forcePaused}
            resizeMode={resizeMode}
            onPlaying={this.handleOnPlaying}
            onProgress={this.handleOnProgress}
          />
        )}

        {!isPortrait && (
          <Animatable.View
            style={[styles.listContainer]}
            animation={showControls ? 'fadeIn' : 'fadeOut'}
            pointerEvents={'box-none'}
            useNativeDriver>

            <PlayPauseIcon
              isPortrait={isPortrait}
              handlePlayVideo={this.handlePlayVideo}
              handlePauseVideo={this.handlePauseVideo}
              paused={paused}
              loading={loading}
            />

            <SeekBar
              currentTime={currentTime}
              duration={duration}
              progress={progress}
              onSeek={this.onSliderPositionChange}
              disabled={loading}
            />

            <SelectSubtitle
              playVideo={this.handlePlayVideo}
              pauseVideo={this.handlePauseVideo}
              selectSubtitle={selectSubtitle}
              subtitles={subtitles}
              disabled={loading}
            />

            {children}

            <View contentContainerStyle={styles.contentContainerStyle}>

              <Overlay variant={'dark'} />

              <TouchableWithoutFeedback
                onPress={this.toggleControls}>
                <View style={styles.placeholderStyle} />
              </TouchableWithoutFeedback>

            </View>

          </Animatable.View>
        )}

      </React.Fragment>
    )
  }
}

export default VideoAndControls
