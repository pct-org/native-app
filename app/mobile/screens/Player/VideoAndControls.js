import React from 'react'
import { Dimensions, StyleSheet, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Orientation from 'react-native-orientation'

import VlcPlayer from 'components/VlcPlayer'
import Overlay from 'components/Overlay'

import PlayPauseIcon from './PlayPauseIcon'
import ResizeMode from './ResizeMode'

const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

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
      isFirstAnimation: true,

      scrollViewHeight: 0,
      scrollViewHeightWithPlaceholder: 0,

      loading: true,
      paused: false,
      resizeMode: 'contain', // 'contain', 'cover', null, 'stretch'

      currentTime: props.currentTime || 0,
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientationChange)

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

  getPlaceholderStyle = () => {
    const { isPortrait } = this.state

    if (isPortrait) {
      return {
        width: windowWidth,
        height: windowHeight,
        opacity: 0,
        zIndex: 1000,
      }
    }

    return {
      width: (windowHeight),
      height: (windowWidth),
      opacity: 0,
      zIndex: 1000,
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
      scrollViewHeight: contentHeight - this.getPlaceholderStyle().height,

      scrollViewHeightWithPlaceholder: contentHeight,
    })
  }

  onSliderPositionChange = (position) => {
    this.handlePauseVideo()

    this.setState({
      progress: position,

    }, () => {
      const { duration } = this.state

      this.videoRef.seek(duration / position)
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

  handlePlayVideo = (a) => {
    this.setState({
      paused: false,

    }, () => {
      this.toggleControlsOff()
    })
  }

  handleOnPlaying = ({ duration }) => {
    const { currentTime } = this.state

    this.setState({
      duration,
      loading: false,
      isFirstAnimation: false,
    }, () => {
      if (currentTime > 0) {
        this.videoRef.seek(currentTime)
      }

      Orientation.lockToLandscape()
    })
  }

  handleOnProgress = ({ currentTime, duration }) => {
    this.setState({
      currentTime,
      duration,
      progress: parseInt(`${(parseInt(currentTime) / parseInt(duration)) * 100}`),
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
    }, 2200)
  }

  render() {
    const { url, renderCastButton, children, forcePaused } = this.props
    const { isPortrait, resizeMode, progress } = this.state
    const { showControls, paused } = this.state
console.log('render video', url)
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
              initOptions: ['--codec=avcodec'],
            }}
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
            />

            <ResizeMode
              activeMode={resizeMode}
              changeResizeMode={this.handleResizeModeChange}
              toggleControls={this.toggleControls}
            />

            {children}

            <ScrollView
              ref={ref => this.scrollViewRef = ref}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              onScroll={this.toggleControls}
              scrollEnabled={showControls}
              onScrollEndDrag={this.positionScroller}
              onContentSizeChange={this.onContentSizeChange}>

              <Overlay variant={'dark'} />

              <TouchableWithoutFeedback onPress={this.toggleControls}>
                <View style={this.getPlaceholderStyle()} />
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

})


export default VideoAndControls
