import React from 'react'
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
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

  scrollViewRef

  videoRef

  controlsTimer = null

  constructor(props) {
    super(props)

    this.today = Date.now()

    this.state = {
      showControls: true,
      isPortrait: Orientation.getInitialOrientation() === 'PORTRAIT',

      scrollViewHeight: 0,
      scrollViewHeightWithPlaceholder: 0,

      loading: true,
      paused: false,
      resizeMode: 'contain', // 'contain', 'cover', null, 'stretch'

      currentTime: 0,
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientationChange)
    Orientation.lockToLandscape()

    this.toggleControls()
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

  positionScroller = (event = null) => {
    const { scrollViewHeight, scrollViewHeightWithPlaceholder } = this.state

    if (event && (scrollViewHeight / 2) < event.nativeEvent.contentOffset.y) {
      this.scrollViewRef.scrollTo({ y: scrollViewHeightWithPlaceholder, animated: true })

      this.toggleControls(false)

    } else {
      this.toggleControlsOff()

      this.scrollViewRef.scrollTo({ y: 0, animated: true })
    }
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({
      scrollViewHeight: contentHeight - styles.placeholderStyle.height,

      scrollViewHeightWithPlaceholder: contentHeight,
    })
  }

  onSliderPositionChange = (position) => {
    this.setState({
      progress: position,

    }, () => {
      this.videoRef.seek(position)
    })
  }

  getEpisodes = () => {
    const { item } = this.props

    let episodes = []

    if (item.type === 'episode') {
      const season = item.show.seasons.find(season => season.number === item.season)

      if (season) {
        episodes = season.episodes
      }
    }

    return episodes
  }

  playEpisode = (episode, quality) => {
    const { playOtherEpisode, item } = this.props

    console.log('playEpisode', episode, quality)
    // playOtherEpisode('other', 'https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov', {
    //   ...item,
    //   ...episode,
    // })
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
    const { showControls, paused } = this.state
    const { currentTime, duration, progress } = this.state

    // Wait until we are in landscape
    if (isPortrait) {
      return null
    }
console.log('active subtitleUri', subtitleUri)
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

        {!isPortrait && duration && (
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
            />

            {/*<ResizeMode*/}
            {/*  activeMode={resizeMode}*/}
            {/*  changeResizeMode={this.handleResizeModeChange}*/}
            {/*  toggleControls={this.toggleControls}*/}
            {/*/>*/}

            <SeekBar
              currentTime={currentTime}
              duration={duration}
              progress={progress}
              onSeek={this.onSliderPositionChange}
            />

            <SelectSubtitle
              playVideo={this.handlePlayVideo}
              pauseVideo={this.handlePauseVideo}
              selectSubtitle={selectSubtitle}
              subtitles={subtitles}
            />

            {children}

            <ScrollView
              ref={(ref) => this.scrollViewRef = ref}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              onScroll={this.toggleControls}
              scrollEnabled={showControls}
              onScrollEndDrag={this.positionScroller}
              onContentSizeChange={this.onContentSizeChange}>

              <Overlay variant={'dark'} />

              <TouchableWithoutFeedback onPress={this.toggleControls}>
                <View style={styles.placeholderStyle} />
              </TouchableWithoutFeedback>

              {/*<ScrollView*/}
              {/*  showsHorizontalScrollIndicator={false}*/}
              {/*  showsVerticalScrollIndicator={false}*/}
              {/*  onScroll={() => this.toggleControls(false)}*/}
              {/*  scrollEventThrottle={10}*/}
              {/*  contentContainerStyle={{*/}
              {/*    flexGrow: 1,*/}
              {/*    backgroundColor: 'green',*/}
              {/*  }}*/}
              {/*  horizontal>*/}

              {/*  {this.getEpisodes().map(episode => (*/}
              {/*    <Episode*/}
              {/*      variant={'player'}*/}
              {/*      key={episode._id}*/}
              {/*      playItem={this.playEpisode}*/}
              {/*      hasAired={episode.firstAired < this.today}*/}
              {/*      {...episode} />*/}
              {/*  ))}*/}

              {/*</ScrollView>*/}

            </ScrollView>

          </Animatable.View>
        )}

      </React.Fragment>
    )
  }
}

export default VideoAndControls
