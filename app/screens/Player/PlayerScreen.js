import React, { Component } from 'react'
import { StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import * as Animatable from 'react-native-animatable'
import { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'

import Typography from 'components/Typography'

export default class VideoPlayer extends Component {

  state = {
    muted      : false,
    duration   : 0.0,
    currentTime: 0.0,
    paused     : false,
    loading    : true,
    casting    : false,
  }

  videoRef

  server
  serverUrl

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.onOrientationChange)
  }

  onOrientationChange = (orientation) => {
    if (orientation === 'LANDSCAPE' && this.videoRef) {
      this.videoRef.presentFullscreenPlayer()

    } else if (orientation === 'PORTRAIT' && this.videoRef) {
      this.videoRef.dismissFullscreenPlayer()
    }
  }

  onPause = () => {
    this.setState({
      paused: true,
    })
  }

  onError = (e) => {
    console.log(e)
  }

  onLoad = (data) => {
    console.log('onLoad', data)
    this.setState({
      duration: data.duration,
      loading : false,
    }, () => {
      Orientation.unlockAllOrientations()
      Orientation.addOrientationListener(this.onOrientationChange)
    })
  }

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime })
  }

  onEnd = () => {
    this.onPause()

    this.videoRef.seek(0)
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    }

    return 0
  }

  render() {
    const { navigation: { state: { params: { item } } } } = this.props
    const { url, casting, paused, muted, loading } = this.state

    return (
      <View style={styles.container}>

        <StatusBar hidden={!paused} animated />

        {loading && (
          <View>
            <ActivityIndicator size={60} color="#FFF" />

            <Typography
              style={{ marginTop: 10 }}
              variant={'title'}>
              {item.title}
            </Typography>
          </View>
        )}

        {!loading && (
          <TouchableOpacity
            style={styles.fullScreen}
            onPress={() => this.setState({ paused: !paused })}
          >
            {(url && !casting && !loading) && (
              <Video
                ref={(ref) => { this.videoRef = ref }}
                source={{ uri: url }}
                style={styles.fullScreen}
                paused={paused}
                volume={1}
                rate={1}
                muted={muted}
                resizeMode={'contain'}
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                onAudioBecomingNoisy={this.onPause}
                repeat={false}
              />
            )}
          </TouchableOpacity>
        )}

        <View style={styles.fullScreen}>
          <Animatable.View
            animation={loading ? 'fadeIn' : 'fadeOut'}
            delay={1000}
            useNativeDriver>

            <View style={styles.controlsTopBar}>
              <View style={styles.castButton}>
                <CastButton style={{ width: 24, height: 24, tintColor: 'white' }} />
              </View>
            </View>

          </Animatable.View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: 'black',
  },

  fullScreen: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
  },

  controlsTopBar: {
    margin: 20,
  },

  castButton: {
    position: 'absolute',
    right   : 16,
  },

})
