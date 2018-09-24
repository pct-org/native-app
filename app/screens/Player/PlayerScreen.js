import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Environment } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import TorrentStreamer from 'react-native-torrent-streamer'

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
  }

  video

  componentDidMount() {
    Orientation.lockToLandscape()

    this.video.presentFullscreenPlayer()

    const { navigation: { state: { params: { magnet } } } } = this.props
    console.log(magnet)

    // this.engine = new WebTorrent({ maxConns: 20 })

    /*this.engine.add(magnet, function (torrent) {
     // Got torrent metadata!
     console.log('Client is downloading:', torrent.infoHash)

     torrent.files.forEach(function (file) {
     console.log(file)
     })
     })*/

    TorrentStreamer.start(magnet)

  }

  componentWillMount() {
    TorrentStreamer.addEventListener('error', this.onError)
    TorrentStreamer.addEventListener('status', this.onStatus.bind(this))
    TorrentStreamer.addEventListener('ready', this.onReady.bind(this))
    TorrentStreamer.addEventListener('stop', this.onStop.bind(this))
  }

  onError(e) {
    console.log(e)
  }

  onStatus({ progress, buffer, downloadSpeed, seeds }) {
    this.setState({
      progress,
      buffer,
      downloadSpeed,
      seeds,
    })
  }

  onReady(data) {
    TorrentStreamer.open(data.url, 'video/mp4')

    console.log('onReady', data)

    this.setState({
      url: data.url,
    })
  }

  onStop(data) {
    console.log('stop')
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
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

    const { url } = this.state
console.log('url',url)
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={(ref) => { this.video = ref }}
            /* For ExoPlayer */
            /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
            source={{ uri: url }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            repeat={false}
          />
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
