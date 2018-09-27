import React, { Component } from 'react'
import { StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import RNFS from 'react-native-fs'
import GoogleCast from 'react-native-google-cast'
import StaticServer from 'react-native-static-server'
import TorrentStreamer from 'react-native-torrent-streamer'
import Video from 'react-native-video'
import * as Animatable from 'react-native-animatable'
import { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'
import { utils } from 'popcorn-sdk'

import Typography from 'components/Typography'

export default class VideoPlayer extends Component {

  state = {
    muted      : false,
    duration   : 0.0,
    currentTime: 0.0,
    paused     : false,
    loading    : true,
    casting    : false,
    fullScreen : false,

    progress     : 0,
    buffer       : 0,
    downloadSpeed: 0,
    doneBuffering: false,
    seeds        : 0,
  }

  videoRef

  staticServer
  serverUrl

  serverDirectory

  constructor(props) {
    super(props)

    this.serverDirectory = RNFS.CachesDirectoryPath

    TorrentStreamer.setup(this.serverDirectory, true)
    this.staticServer = new StaticServer(0, this.serverDirectory, { keepAlive: true })
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')

    Orientation.removeOrientationListener(this.onOrientationChange)
    Orientation.lockToPortrait()

    TorrentStreamer.removeEventListener('error', this.onError)
    TorrentStreamer.removeEventListener('status', this.onTorrentStatus)
    TorrentStreamer.removeEventListener('ready', this.onTorrentReady)

    TorrentStreamer.stop()

    this.staticServer.kill()
  }

  async componentDidMount() {
    const { navigation: { state: { params: { magnet, item } } } } = this.props


    Orientation.addOrientationListener(this.onOrientationChange)

//    this.serverUrl = await this.server.start()

    TorrentStreamer.addEventListener('error', this.onError)
    TorrentStreamer.addEventListener('status', this.onTorrentStatus)
    TorrentStreamer.addEventListener('ready', this.onTorrentReady)
    // TorrentStreamer.addEventListener('stop', this.onStop.bind(this))

    // Start
    TorrentStreamer.start(magnet.url)
  }

  onOrientationChange = (orientation) => {
    if (orientation === 'LANDSCAPE' && this.videoRef) {
      this.videoRef.presentFullscreenPlayer()

      this.setState({
        fullScreen: true,
      })

    } else if (orientation === 'PORTRAIT' && this.videoRef) {
      this.videoRef.dismissFullscreenPlayer()

      this.setState({
        fullScreen: false,
      })
    }
  }

  onTorrentStatus = (status) => {
    const { buffer, progress } = this.state

    const nProgress = parseFloat(status.progress).toFixed(2)

    if (status.buffer !== buffer || nProgress > (progress + 1.0)) {
      this.setState({
        ...status,
        progress     : nProgress,
        downloadSpeed: utils.formatKbToString(status.downloadSpeed),
        doneBuffering: status.buffer === '100',
      })
    }
  }

  onTorrentReady = async(data) => {
    const { navigation: { state: { params: { item } } } } = this.props
    const { casting } = this.state

    console.log('onReady', data)
    console.log('item', item)
    // console.log('castState', GoogleCast.getCastState())

    /*if (casting || await GoogleCast.getCastState().toLowerCase() === 'connected') {
     console.log('data.url', data.url)
     const mediaUrl = this.serverUrl + data.url.replace(RNFS.CachesDirectoryPath, '')
     console.log('\n\n\nmediaUrl', mediaUrl)

     GoogleCast.castMedia({
     title   : item.title,
     subtitle: item.summary,
     // studio: video.studio,
     // duration: video.duration,
     mediaUrl,

     imageUrl : item.images.fanart.high,
     posterUrl: item.images.poster.high,
     })

     GoogleCast.launchExpandedControls()


     } else {*/

    this.setState({
      url          : data.url,
      buffer       : '100',
      doneBuffering: true,
      loading      : false,
    })

    //}
  }

  onVideoPause = () => {
    this.setState({
      paused: true,
    })
  }

  onError = (e) => {
    console.log('error', e)
  }

  onVideoLoad = (data) => {
    console.log('onLoad', data)

    this.setState({
      duration: data.duration,
      loading : false,
    }, () => {
      Orientation.unlockAllOrientations()
    })
  }

  onVideoProgress = (data) => {
    this.setState({ currentTime: data.currentTime })
  }

  onVideoEnd = () => {
    this.onVideoPause()

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
    const { url, casting, paused, muted, loading, fullScreen } = this.state
    const { progress, doneBuffering, buffer, downloadSpeed, seeds } = this.state

    return (
      <View style={styles.container}>

        <StatusBar hidden={!paused && !casting && doneBuffering} animated />

        {loading && (
          <View style={[styles.fullScreen, styles.loadingContainer]}>

            <ActivityIndicator size={60} color="#FFF" />

            <Typography
              style={{ marginTop: 10 }}
              variant={'title'}>
              {item.title}
            </Typography>

            {buffer !== 0 && !doneBuffering && (
              <React.Fragment>
                <Typography style={{ marginTop: 10 }}>
                  Buffering...
                </Typography>
                <Typography variant={'body2'} style={{ marginTop: 5 }}>
                  {buffer}% / {downloadSpeed}
                </Typography>
              </React.Fragment>
            )}

            {buffer === 0 && (
              <Typography style={{ marginTop: 10 }}>
                Connecting...
              </Typography>
            )}

          </View>
        )}

        {!loading && !casting && doneBuffering && (
          <TouchableOpacity
            style={styles.fullScreen}
            onPress={() => this.setState({ paused: !this.state.paused })}>
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
                onLoad={this.onVideoLoad}
                onProgress={this.onVideoProgress}
                onEnd={this.onVideoEnd}
                onError={this.onError}
                onAudioBecomingNoisy={this.onVideoPause}
                repeat={false}
              />
            )}
          </TouchableOpacity>
        )}

        <View style={styles.controlsTopBar}>
          <View style={styles.castButton}>
            <CastButton style={{ width: 30, height: 30, tintColor: 'white' }} />
          </View>
        </View>

        {buffer !== 0 && (
          <Animatable.View
            style={styles.controlsBottom}
            animation={paused ? 'fadeInUp' : 'fadeOutDown'}
            useNativeDriver>
            <View style={styles.stats}>
              {progress !== '100' && (
                <React.Fragment>
                  <Typography>progress: {progress}</Typography>
                  <Typography>speed: {downloadSpeed}</Typography>
                  <Typography>seeds: {seeds}</Typography>
                </React.Fragment>
              )}

              {progress === '100' && (
                <React.Fragment>
                  <Typography>complete</Typography>
                </React.Fragment>
              )}
            </View>
          </Animatable.View>
        )}

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex           : 1,
    backgroundColor: 'black',
  },

  fullScreen: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
  },

  loadingContainer: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },

  controlsTopBar: {},

  castButton: {
    position: 'absolute',
    right   : 16,
    top     : 16,
  },

  controlsCenter: {},

  controlsBottom: {
    position: 'absolute',
    bottom  : 0,
    width   : '100%',
  },

  stats: {
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    margin        : 16,
  },

})
