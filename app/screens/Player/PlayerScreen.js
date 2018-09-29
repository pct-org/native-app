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

  async componentDidMount() {
    const { navigation: { state: { params: { magnet } } } } = this.props

    Orientation.addOrientationListener(this.onOrientationChange)

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED, this.onCastMediaUpdate)

    TorrentStreamer.addEventListener('error', this.onError)
    TorrentStreamer.addEventListener('status', this.onTorrentStatus)
    TorrentStreamer.addEventListener('ready', this.onTorrentReady)

    // Start
    TorrentStreamer.start(magnet.url)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')

    Orientation.removeOrientationListener(this.onOrientationChange)
    Orientation.lockToPortrait()

    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_STATUS_UPDATED)

    TorrentStreamer.removeEventListener('error', this.onError)
    TorrentStreamer.removeEventListener('status', this.onTorrentStatus)
    TorrentStreamer.removeEventListener('ready', this.onTorrentReady)

    TorrentStreamer.stop()

    this.staticServer.kill()

    GoogleCast.endSession(true)
  }

  onOrientationChange = (orientation) => {
    if (orientation === 'LANDSCAPE' && this.videoRef) {
      this.videoRef.presentFullscreenPlayer()

    } else if (orientation === 'PORTRAIT' && this.videoRef) {
      this.videoRef.dismissFullscreenPlayer()
    }
  }

  onCastMediaUpdate = () => {
    console.log('MEDIA_STATUS_UPDATED', arguments)
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

    const castState = await GoogleCast.getCastState()

    if (castState.toLowerCase() === 'connected') {
      if (!this.serverUrl) {
        this.serverUrl = await this.staticServer.start()
      }

      GoogleCast.castMedia({
        title   : item.title,
        subtitle: item.summary,
        // studio: video.studio,
        // duration: video.duration,

        mediaUrl: this.serverUrl + data.url.replace(this.serverDirectory, ''),

        imageUrl : item.images.fanart.high,
        posterUrl: item.images.poster.high,
      })

      this.showCastingControls()

      this.setState({
        buffer       : '100',
        doneBuffering: true,
        loading      : false,
        casting      : true,
      })

    } else {
      this.setState({
        url          : data.url,
        buffer       : '100',
        doneBuffering: true,
        loading      : false,
      })
    }
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

  showCastingControls = () => {
    GoogleCast.launchExpandedControls()
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
    const { progress, doneBuffering, buffer, downloadSpeed, seeds } = this.state

    return (
      <View style={styles.container}>

        <StatusBar hidden={!paused && !casting && doneBuffering} animated />

        {(loading || casting) && (
          <View style={[styles.fullScreen, styles.loadingContainer]}>

            {loading && (
              <ActivityIndicator size={60} color="#FFF" />
            )}

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
          <Animatable.View
            animation={paused || loading ? 'fadeInDown' : 'fadeOutUp'}
            useNativeDriver
            style={styles.castButton}>
            <CastButton style={{ width: 30, height: 30, tintColor: 'white' }} />
          </Animatable.View>
        </View>

        {buffer !== 0 && (
          <Animatable.View
            style={styles.controlsBottom}
            animation={paused || casting ? 'fadeInUp' : 'fadeOutDown'}
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
    right   : 24,
    top     : 24,
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
    margin        : 24,
  },

})
