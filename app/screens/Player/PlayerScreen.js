import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import TorrentStreamer from 'react-native-torrent-streamer'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import StaticServer from 'react-native-static-server'
import RNFS from 'react-native-fs'

export default class VideoPlayer extends Component {

  state = {
    rate       : 1,
    volume     : 1,
    muted      : false,
    resizeMode : 'contain',
    duration   : 0.0,
    currentTime: 0.0,
    paused     : true,

    progress     : 0,
    buffer       : 0,
    downloadSpeed: 0,
    seeds        : 0,

    url: null,

    casting: false,
  }

  video

  server
  serverUrl


  constructor(props) {
    super(props)

    TorrentStreamer.setup(RNFS.CachesDirectoryPath, true)

    this.server = new StaticServer(0, RNFS.CachesDirectoryPath, { keepAlive: true })
  }

  async componentDidMount() {
    Orientation.lockToLandscape()

    const { navigation: { state: { params: { magnet, item } } } } = this.props
    console.log('magnet', magnet)
    console.log('NativeModules.RNFSManager', RNFS.CachesDirectoryPath)
    console.log('castState', await GoogleCast.getCastState())

    this.serverUrl = await this.server.start()

    console.log('serving from', this.serverUrl)

    TorrentStreamer.addEventListener('error', this.onError.bind(this))
    TorrentStreamer.addEventListener('status', this.onStatus.bind(this))
    TorrentStreamer.addEventListener('ready', this.onReady.bind(this))
    TorrentStreamer.addEventListener('stop', this.onStop.bind(this))

    console.log(' TorrentStreamer.start(magnet)', TorrentStreamer.start(magnet))

    /*    GoogleCast.castMedia({
     title    : item.title,
     subtitle : item.summary,
     // studio: video.studio,
     // duration: video.duration,
     // mediaUrl : '/storage/emulated/0/Download/Sicario Day Of The So…f.The.Soldado.2018.1080p.WEBRip.x264-[YTS.AM].mp4',
     mediaUrl : 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
     imageUrl : item.images.fanart.high,
     posterUrl: item.images.poster.high,
     })*/

  }

  componentWillMount() {
    // Establishing connection to Chromecast
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTING, () => console.log('Chromecast session starting'))

    // Connection established
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
      console.log('Chromecast session started')

      this.setState({
        casting: true,
      })
    })

    // Connection failed
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_START_FAILED, (error) => { console.error(error) })

    // Connection suspended (your application went to background or disconnected)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_SUSPENDED, () => console.log('Chromecast session suspended'))

    // Attempting to reconnect
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMING, () => console.log('Chromecast session resuming'))

    // Reconnected
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMED, () => console.log('Chromecast session resumed'))

    // Disconnecting
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDING, () => console.log('Chromecast session ending'))

    // Disconnected (error provides explanation if ended forcefully)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, (error) => console.log('Chromecast session ended', error))
  }

  onError(e) {
    console.log(e)
  }

  onStatus(status) {
    this.setState(status)
  }

  async onReady(data) {
    // TorrentStreamer.open(data.url, 'video/mp4')

    const { navigation: { state: { params: { item } } } } = this.props

    console.log('onReady', data)
    console.log('item', item)
    console.log('castState', GoogleCast.getCastState())

    const { casting } = this.state

    if (casting || await GoogleCast.getCastState().toLowerCase() === 'connected') {
      const { navigation: { state: { params: { item } } } } = this.props
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


    } else {
      this.setState({
        url: data.url,
      }, () => {
        this.video.presentFullscreenPlayer()

      })
    }
  }

  onStop(data) {
    console.log('stop')
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()

    TorrentStreamer.stop()
    this.server.kill()
  }

  onLoad = (data) => {
    console.log('onLoad', data)
    this.setState({
      duration: data.duration,
      paused  : false,
    })
  }

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime })
  }

  onEnd = () => {
    console.log('onEnd')
    this.setState({ paused: true })
    this.video.seek(0)
  }

  onAudioBecomingNoisy = () => {
    console.log('onAudioBecomingNoisy')
    this.setState({ paused: true })
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    }
    return 0
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate)

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode)

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume)

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100

    const { url, casting } = this.state

    return (
      <View style={styles.container}>

        <StatusBar hidden />

        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          {url && (
            <Video
              ref={(ref) => { this.video = ref }}
              /* For ExoPlayer */
              /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
              source={{ uri: url }}
              style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused || casting}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              repeat={false}
            />
          )}
        </TouchableOpacity>

        <View style={styles.controls}>
          <Animatable.View
            animation={this.state.paused ? 'fadeIn' : 'fadeOut'}
            delay={2000}
            useNativeDriver>
            <View
              style={styles.generalControls}>
              <View style={styles.rateControl}>
                {this.renderRateControl(0.25)}
                {this.renderRateControl(0.5)}
                {this.renderRateControl(1.0)}
                {this.renderRateControl(1.5)}
                {this.renderRateControl(2.0)}
              </View>

              <View style={styles.volumeControl}>
                {this.renderVolumeControl(0.5)}
                {this.renderVolumeControl(1)}
                {this.renderVolumeControl(1.5)}
              </View>

              <View style={styles.resizeModeControl}>
                <CastButton
                  style={{ width: 24, height: 24, tintColor: 'white' }} />
              </View>

              <View style={styles.resizeModeControl}>
                <Text style={styles.controlOption}>progress: {this.state.progress} - </Text>
                <Text style={styles.controlOption}>buffer: {this.state.buffer} - </Text>
                <Text style={styles.controlOption}>downloadSpeed: {this.state.downloadSpeed} - </Text>
                <Text style={styles.controlOption}>seeds: {this.state.seeds}</Text>
              </View>


              <View style={styles.resizeModeControl}>
                {this.renderResizeModeControl('cover')}
                {this.renderResizeModeControl('contain')}
                {this.renderResizeModeControl('stretch')}
              </View>
            </View>

            <View style={styles.trackingControls}>
              <View style={styles.progress}>
                <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
              </View>
            </View>
          </Animatable.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container             : {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: 'black',
  },
  fullScreen            : {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
  },
  controls              : {
    backgroundColor: 'transparent',
    borderRadius   : 5,
    position       : 'absolute',
    bottom         : 20,
    left           : 20,
    right          : 20,
  },
  progress              : {
    flex         : 1,
    flexDirection: 'row',
    borderRadius : 3,
    overflow     : 'hidden',
  },
  innerProgressCompleted: {
    height         : 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height         : 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls       : {
    flex           : 1,
    flexDirection  : 'row',
    borderRadius   : 4,
    overflow       : 'hidden',
    paddingBottom  : 10,
    backgroundColor: 'black',
  },
  rateControl           : {
    flex          : 1,
    flexDirection : 'row',
    justifyContent: 'center',
  },
  volumeControl         : {
    flex          : 1,
    flexDirection : 'row',
    justifyContent: 'center',
  },
  resizeModeControl     : {
    flex          : 1,
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
  },
  controlOption         : {
    alignSelf   : 'center',
    fontSize    : 11,
    color       : 'white',
    paddingLeft : 2,
    paddingRight: 2,
    lineHeight  : 12,
  },

  trackingControls: {
    height: 10,
  },

})
