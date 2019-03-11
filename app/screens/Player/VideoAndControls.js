import React from 'react'
import { Dimensions, Slider, StatusBar } from 'react-native'
import RNVideo, { TextTrackType } from 'react-native-video'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import Orientation from 'react-native-orientation'

import PlayPauseIcon from './PlayPauseIcon'

const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

export class EpisodesBar extends React.Component {

  state = {
    showControls    : true,
    isPortrait      : true,
    isFirstAnimation: true,

    scrollViewHeight               : 0,
    scrollViewHeightWithPlaceholder: 0,

    paused    : false,
    resizeMode: 'contain', // 'contain', 'cover', null, 'stretch'

    currentTime: 0,
  }

  scrollViewRef

  videoRef

  controlsTimer = null

  constructor(props) {
    super(props)

    this.today = Date.now()
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
        width  : windowWidth,
        height : (windowHeight - 20),
        opacity: 0,
      }
    }

    return {
      width  : (windowHeight),
      height : (windowWidth - 20),
      opacity: 0,
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

  /*  getEpisodes = () => {
   const { item } = this.props

   let episodes = []

   if (item.type === Constants.TYPE_SHOW_EPISODE) {
   const season = item.seasons.find(season => season.number === item.season)

   if (season) {
   episodes = season.episodes
   }
   }

   return episodes
   }

   playEpisode = (episode) => {
   const { playItem, item } = this.props

   playItem('other', 'https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov', {
   ...item,
   ...episode,
   })
   }*/

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

  handleVideoLoad = (data) => {
    const { currentTime } = this.state

    this.setState({
      duration: data.duration,
      loading : false,

      isFirstAnimation: false,
    }, () => {
      if (currentTime > 0) {
        this.videoRef.seek(currentTime)
      }

      Orientation.unlockAllOrientations()
    })
  }

  handleVideoProgress = ({ currentTime }) => {
    const { duration } = this.state

    this.setState({
      currentTime,
      progress: parseInt((parseInt(currentTime) / parseInt(duration)) * 100),
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
    const { url, item, children, subs, activeSub, forcePaused } = this.props
    const { isPortrait, resizeMode, progress } = this.state
    const { showControls, paused } = this.state

    return (
      <React.Fragment>
        <StatusBar
          hidden={!paused && !isPortrait}
          animated />

        {url && (
          <RNVideo
            ref={(ref) => { this.videoRef = ref }}
            source={{ uri: url }}
            style={styles.video}
            paused={paused || forcePaused}
            volume={1}
            rate={1}
            muted={false}
            resizeMode={resizeMode}
            onLoad={this.handleVideoLoad}
            onProgress={this.handleVideoProgress}
            onAudioBecomingNoisy={this.handlePauseVideo}
            onSeek={this.handlePlayVideo}
            repeat={false}
            textTracks={subs}
            selectedTextTrack={
              activeSub
                ? {
                  type : 'language',
                  value: activeSub,
                }
                : null
            }
          />
        )}

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

          {children}

          <Slider
            value={progress}
            thumbTintColor={'#FFF'}
            minimumTrackTintColor={'#FFF'}
            maximumTrackTintColor={'#FFF'}
            maximumValue={100}
            step={5}
            disabled
            style={styles.slider}
            onValueChange={this.onSliderPositionChange} />

          <ScrollView
            ref={ref => this.scrollViewRef = ref}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            onScroll={this.toggleControls}
            scrollEnabled={showControls}
            onScrollEndDrag={this.positionScroller}
            onContentSizeChange={this.onContentSizeChange}>

            <View style={[styles.overlay]} />

            <TouchableWithoutFeedback onPress={this.toggleControls}>
              <View style={this.getPlaceholderStyle()} />
            </TouchableWithoutFeedback>

            {/*<ScrollView
             showsHorizontalScrollIndicator={false}
             showsVerticalScrollIndicator={false}
             onScroll={() => this.toggleControls(false)}
             scrollEventThrottle={10}
             contentContainerStyle={{
             flexGrow: 1,
             }}
             horizontal>

             {this.getEpisodes().map(episode => (
             <Episode
             variant={'big'}
             key={episode.key}
             playItem={() => {
             //this.playEpisode(episode)
             }}
             hasAired={episode.aired < this.today}
             {...episode} />
             ))}

             </ScrollView>*/}

          </ScrollView>

        </Animatable.View>

      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({

  listContainer: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
    zIndex  : 1000,
  },

  overlay: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
    opacity : 0.6,
    flex    : 1,

    backgroundColor: '#000',
  },

  contentContainerStyle: {
    flexGrow: 1,
    flex    : 1,
    position: 'absolute',
    top     : 0,
    bottom  : 0,
    left    : 0,
    right   : 0,
  },

  video: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
  },

  slider: {
    position: 'absolute',
    left    : 16,
    bottom  : 64,
    right   : 16,
    zIndex  : 1001,
  },

})


export default withNavigation(EpisodesBar)
