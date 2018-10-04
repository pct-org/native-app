import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import RNFS from 'react-native-fs'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import StaticServer from 'react-native-static-server'
import TorrentStreamer from 'react-native-torrent-streamer'
import Video from 'react-native-video'
import * as Animatable from 'react-native-animatable'
import Orientation from 'react-native-orientation'
import { utils } from 'popcorn-sdk'

import i18n from 'modules/i18n'

import Typography from 'components/Typography'

export default class VideoPlayer extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

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

  staticServer = null

  serverUrl = null

  serverDirectory = null

  constructor(props) {
    super(props)

    this.serverDirectory = RNFS.CachesDirectoryPath

    TorrentStreamer.setup(this.serverDirectory, true)
    this.staticServer = new StaticServer(0, this.serverDirectory, { keepAlive: true })
  }

  componentDidMount() {
    const { navigation: { state: { params: { magnet } } } } = this.props

    Orientation.addOrientationListener(this.handleOrientationChange)

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED, this.handleCastMediaUpdate)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, this.handleCastSessionStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, this.handleCastSessionEnded)

    TorrentStreamer.addEventListener('error', this.handleTorrentError)
    TorrentStreamer.addEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.addEventListener('ready', this.handleTorrentReady)

    // Start
    TorrentStreamer.start(magnet.url)
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.handleOrientationChange)
    Orientation.lockToPortrait()

    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_STATUS_UPDATED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_ENDED)

    TorrentStreamer.removeEventListener('error', this.handleTorrentError)
    TorrentStreamer.removeEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.removeEventListener('ready', this.handleTorrentReady)

    TorrentStreamer.stop()

    this.staticServer.kill()

    GoogleCast.endSession(true)
  }

  handleOrientationChange = (orientation) => {
    if (orientation === 'LANDSCAPE' && this.videoRef) {
      this.videoRef.presentFullscreenPlayer()

    } else if (orientation === 'PORTRAIT' && this.videoRef) {
      this.videoRef.dismissFullscreenPlayer()
    }
  }

  handleCastSessionStarted = () => {
    const { url, doneBuffering } = this.state

    if (doneBuffering) {
      this.startCasting(url)
    }
  }

  handleCastMediaUpdate = ({ mediaStatus }) => {
    if (mediaStatus.streamPosition > 0) {
      this.setState({
        currentTime: mediaStatus.streamPosition,
      })
    }
  }

  handleCastSessionEnded = () => {
    this.setState({
      paused : false,
      casting: false,
    })
  }

  handleTorrentStatus = (status) => {
    const { buffer, progress } = this.state

    const nProgress = parseFloat(status.progress)

    if (status.buffer !== buffer || (nProgress > (progress + 1)) || nProgress > 99) {
      this.setState({
        ...status,
        progress     : nProgress > 99 ? 100 : nProgress,
        downloadSpeed: utils.formatKbToString(status.downloadSpeed),
        doneBuffering: status.buffer === '100',
      })
    }
  }

  handleTorrentReady = async(data) => {
    const castState = await GoogleCast.getCastState()

    if (castState.toLowerCase() === 'connected') {
      this.startCasting(data.url)

    } else {
      this.setState({
        url          : data.url,
        buffer       : '100',
        doneBuffering: true,
        loading      : false,
      })
    }
  }

  handleVideoPressed = () => {
    const { paused } = this.state

    this.setState({
      paused: !paused,
    })
  }

  handleVideoPause = () => {
    this.setState({
      paused: true,
    })
  }

  handleTorrentError = (e) => {
    // eslint-disable-next-line no-console
    console.log('error', e)
  }

  handleVideoLoad = (data) => {
    const { currentTime } = this.state

    this.setState({
      duration: data.duration,
      loading : false,
    }, () => {
      if (currentTime > 0) {
        this.videoRef.seek(currentTime)
      }

      Orientation.unlockAllOrientations()
    })
  }

  handleVideoProgress = (data) => {
    this.setState({ currentTime: data.currentTime })
  }

  handleVideoEnd = () => {
    this.handleVideoPause()

    this.videoRef.seek(0)
  }

  showCastingControls = () => {
    GoogleCast.launchExpandedControls()
  }

  startCasting = async(url) => {
    const { navigation: { state: { params: { item } } } } = this.props
    const { currentTime } = this.state

    if (!this.serverUrl) {
      this.serverUrl = await this.staticServer.start()
    }

    GoogleCast.castMedia({
      title   : item.title,
      subtitle: item.summary,
      // studio: video.studio,
      // duration: video.duration,

      playPosition: currentTime,

      mediaUrl: this.serverUrl + url.replace(this.serverDirectory, ''),

      imageUrl : item.images.fanart.high,
      posterUrl: item.images.poster.high,
    })

    this.setState({
      url,
      buffer       : '100',
      doneBuffering: true,
      loading      : false,
      casting      : true,
    }, () => {
      this.showCastingControls()
    })
  }

  getCurrentTimePercentage() {
    const { currentTime, duration } = this.state

    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration)
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
              <ActivityIndicator size={60} color={'#FFF'} />
            )}

            <Typography
              style={{ marginTop: 10 }}
              variant={'title'}>
              {item.title}
            </Typography>

            {buffer !== 0 && !doneBuffering && (
              <React.Fragment>
                <Typography style={{ marginTop: 10 }}>
                  {i18n.t('Buffering...')}
                </Typography>
                <Typography variant={'body2'} style={{ marginTop: 5 }}>
                  {buffer}% / {downloadSpeed}
                </Typography>
              </React.Fragment>
            )}

            {buffer === 0 && (
              <Typography style={{ marginTop: 10 }}>
                {i18n.t('Connecting...')}
              </Typography>
            )}

          </View>
        )}

        {!loading && !casting && doneBuffering && (
          <TouchableOpacity
            style={styles.fullScreen}
            onPress={this.handleVideoPressed}>
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
                onVideoError={(e) => console.log('onVideoError', e)}
                onLoad={this.handleVideoLoad}
                onProgress={this.handleVideoProgress}
                onEnd={this.handleVideoEnd}
                onError={this.handleTorrentError}
                onAudioBecomingNoisy={this.handleVideoPause}
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
              {progress !== 100 && (
                <React.Fragment>
                  <Typography>{i18n.t('progress: {{progress}}', { progress: progress.toFixed(2) })}</Typography>
                  <Typography>{i18n.t('speed: {{downloadSpeed}}', { downloadSpeed })}</Typography>
                  <Typography>{i18n.t('seeds: {{seeds}}', { seeds })}</Typography>
                </React.Fragment>
              )}

              {progress === 100 && (
                <Typography>
                  {i18n.t('complete')}
                </Typography>
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
