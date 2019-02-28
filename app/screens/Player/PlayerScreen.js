import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, StyleSheet, ActivityIndicator, View, BackHandler } from 'react-native'
import RNFS from 'react-native-fs'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import StaticServer from 'react-native-static-server'
import TorrentStreamer from 'react-native-torrent-streamer'
import { Constants, utils } from 'popcorn-sdk'
import Orientation from 'react-native-orientation'
import { TextTrackType } from 'react-native-video'

import i18n from 'modules/i18n'
import PopcornSDK from 'modules/PopcornSDK'
import SubtitlesManager from 'modules/SubtitlesManager'
import sortAB from 'modules/utils/sortAB'

import Typography from 'components/Typography'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import SubSelector from 'components/SubSelector'

import VideoAndControls from './VideoAndControls'

export default class VideoPlayer extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  staticServer = null

  serverUrl = null

  serverDirectory = null

  constructor(props) {
    super(props)

    this.serverDirectory = RNFS.CachesDirectoryPath

    TorrentStreamer.setup(this.serverDirectory, false)
    this.staticServer = new StaticServer(0, this.serverDirectory, { keepAlive: true })

    const { navigation: { state: { params: { item } } } } = props

    this.state = {
      item,
      duration   : 0.0,
      currentTime: 0.0,
      loading    : true,
      casting    : false,

      progress: 0,
      buffer  : 0,

      downloadSpeed         : 0,
      downloadSpeedFormatted: '',

      doneBuffering: false,
      seeds        : 0,

      loadedMagnet: null,

      showSubSelector: false,
      activeSub      : null,
      subs           : null,
    }
  }

  componentDidMount() {
    const { navigation: { state: { params: { magnet, item } } } } = this.props

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED, this.handleCastMediaProgressUpdate)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, this.handleCastSessionStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, this.handleCastSessionEnded)

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    TorrentStreamer.addEventListener('error', this.handleTorrentError)
    TorrentStreamer.addEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.addEventListener('ready', this.handleTorrentReady)

    // Start
    TorrentStreamer.start(magnet.url)

    // Fetch subs
    if (item.type === Constants.TYPE_MOVIE) {
      SubtitlesManager.search(item).then((subs) => {
        this.setState({
          subs,
        })
      })
    }

    // this.setState({
    //   url          : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    //   buffer       : '100',
    //   doneBuffering: true,
    //   loading      : false,
    // })
  }

  playItem = (magnet = null, url = null, item = null) => {
    const { navigation: { state: { params: { magnet: propsMagnet, item: propsItem } } } } = this.props

    this.setState({
      item         : item || propsItem,
      url          : url,
      buffer       : 0,
      doneBuffering: false,
      loading      : true,
      loadedMagnet : magnet || propsMagnet,
    }, () => {
      TorrentStreamer.start(magnet.url)
    })
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()

    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_STATUS_UPDATED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_ENDED)

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)

    TorrentStreamer.removeEventListener('error', this.handleTorrentError)
    TorrentStreamer.removeEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.removeEventListener('ready', this.handleTorrentReady)

    TorrentStreamer.stop()

    this.staticServer.kill()

    // Stop casting but keep the connection
    GoogleCast.stop()
  }

  handleBackPress = () => {
    const { showSubSelector } = this.state

    if (showSubSelector) {
      this.setState({
        showSubSelector: false,
      })

      return true
    }

    return false
  }

  handleCastSessionStarted = () => {
    const { url, doneBuffering } = this.state

    if (doneBuffering) {
      this.startCasting(url)
    }
  }

  handleCastMediaProgressUpdate = ({ mediaProgress }) => {
    // if (mediaProgress.progress > 0) {
    //   this.setState({
    //     duration   : mediaProgress.duration
    //     currentTime: mediaProgress.progress,
    //   })
    // }
  }

  handleCastSessionEnded = () => {
    this.setState({
      casting: false,
    })
  }

  handleTorrentStatus = (status) => {
    const nProgress = parseFloat(status.progress)

    if (this.shouldUpdateStatus(status, nProgress)) {
      this.setState({
        ...status,
        progress     : nProgress > 99 ? 100 : nProgress,
        doneBuffering: status.buffer === '100',
        downloadSpeed: status.downloadSpeed,

        downloadSpeedFormatted: utils.formatKbToString(status.downloadSpeed),
      })
    }
  }

  handleTorrentReady = async(data) => {
    const castState = await GoogleCast.getCastState()

    let newState = {
      url          : null,
      buffer       : '100',
      doneBuffering: true,
      loading      : false,
    }

    if (castState.toLowerCase() === 'connected') {
      await this.startCasting(data.url)

    } else {
      newState.url = data.url
    }

    this.setState(newState)
  }

  handleTorrentError = (e) => {
    // eslint-disable-next-line no-console
    console.log('error', e)
  }

  handleSelectSub = (forceTo) => {
    this.setState({
      showSubSelector: forceTo,
    })
  }

  handleSubChange = (sub) => {
    this.setState({
      showSubSelector: false,
      activeSub      : sub
        ? sub.language
        : null,
    })
  }

  shouldUpdateStatus = (status, nProgress) => {
    const { buffer, progress } = this.state

    if (status.buffer !== buffer) {
      return true
    }

    if (nProgress > (progress + 0.20) || nProgress > 99) {
      return true
    }

    // TODO:: Also check if download speed differ
    return false
  }

  showCastingControls = () => {
    GoogleCast.launchExpandedControls()
  }

  startCasting = async(url) => {
    const { navigation: { state: { params: { item } } } } = this.props
    // const { currentTime } = this.state

    const { subs } = this.state

    if (!this.serverUrl) {
      this.serverUrl = await this.staticServer.start()
    }

    GoogleCast.castMedia({
      title   : this.getItemTitle(),
      subtitle: item.summary,
      tracks  : subs,
      // studio: video.studio,
      // duration: video.duration,

      // playPosition: currentTime,

      mediaUrl : this.serverUrl + url.replace(this.serverDirectory, ''),
//      imageUrl : this.getItemImage('fanart'),
      posterUrl: this.getItemImage('poster'),
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

  getItemTitle = () => {
    const { item } = this.state

    if (item.showTitle) {
      return `${item.showTitle} - ${item.title}`
    }

    return item.title
  }

  getItemImage = (type) => {
    const { item } = this.state

    // If it's the poster then always return the cover
    if (type === 'poster' && item.show) {
      return item.show.images[type].high
    }

    // If it's a show and the item itself does not have the image then use the shows
    if (item.show && !item.images[type].high) {
      return item.show.images[type].high
    }

    // Return the image of the image
    return item.images[type].high
  }

  /**
   * @param castButtonOnly We only show the cast button when everything is still loading
   *
   * @returns {*}
   */
  renderAdditionalControls = (castButtonOnly = false) => {
    const { progress, downloadSpeedFormatted, seeds } = this.state
    const { casting, subs, activeSub } = this.state

    return (
      <React.Fragment>

        {!casting && subs && subs.length > 0 && (
          <View style={styles.subsButton} pointerEvents={'box-none'}>
            <IconButton
              animatable={{
                animation: 'fadeIn',
              }}
              style={styles.icon}
              onPress={() => this.handleSelectSub(true)}
              name={activeSub ? 'subtitles' : 'subtitles-outline'}
              color={'#FFF'}
              size={30} />
          </View>
        )}

        <View style={styles.castButton} pointerEvents={'box-none'}>
          <CastButton style={{ width: 30, height: 30, tintColor: 'white' }} />
        </View>

        {!castButtonOnly && (
          <View style={styles.stats}>
            {progress !== 100 && (
              <React.Fragment>
                <View style={styles.statItem}>
                  <Typography>{i18n.t('progress')}</Typography>
                  <Typography>{progress.toFixed(2)}</Typography>
                </View>

                <View style={styles.statItem}>
                  <Typography>{i18n.t('speed')}</Typography>
                  <Typography>{downloadSpeedFormatted.toString()}</Typography>
                </View>

                <View style={styles.statItem}>
                  <Typography>{i18n.t('seeds')}</Typography>
                  <Typography>{seeds.toString()}</Typography>
                </View>
              </React.Fragment>
            )}

            {progress === 100 && (
              <Typography>
                {i18n.t('complete')}
              </Typography>
            )}
          </View>
        )}
      </React.Fragment>
    )
  }

  render() {
    const { url, casting, loading, showControls, item, subs, showSubSelector } = this.state
    const { doneBuffering, buffer, downloadSpeedFormatted, activeSub } = this.state

    return (
      <View style={styles.container}>

        <StatusBar hidden={false} animated />

        {(loading || casting) && (
          <View style={[styles.fullScreen, styles.loadingContainer]}>

            {loading && (
              <ActivityIndicator size={60} color={'#FFF'} />
            )}

            <Typography
              style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}
              variant={'title'}>
              {this.getItemTitle()}
            </Typography>

            {loading || casting && (
              <Button
                variant={'primary'}
                onPress={this.showCastingControls}>
                {i18n.t('Controls')}
              </Button>
            )}

            {buffer !== 0 && !doneBuffering && (
              <React.Fragment>
                <Typography style={{ marginTop: 10 }}>
                  {i18n.t('Buffering')}
                </Typography>

                <Typography variant={'body2'} style={{ marginTop: 5 }}>
                  {buffer}% / {downloadSpeedFormatted}
                </Typography>
              </React.Fragment>
            )}

            {buffer === 0 && (
              <Typography style={{ marginTop: 10 }}>
                {i18n.t('Connecting')}
              </Typography>
            )}

          </View>
        )}

        {!loading && !casting && (
          <React.Fragment>

            <VideoAndControls
              item={item}
              url={url}
              toggleControls={this.toggleControls}
              toggleControlsOff={this.toggleControlsOff}
              playItem={this.playItem}
              showControls={showControls}
              forcePaused={showSubSelector}
              activeSub={activeSub}
              subs={subs}>

              {this.renderAdditionalControls()}

            </VideoAndControls>

            <SubSelector
              cancel={() => this.handleSelectSub(false)}
              selectSub={this.handleSubChange}
              show={showSubSelector}
              subs={subs} />

          </React.Fragment>
        )}

        {(casting || loading) && (
          <View
            pointerEvents={'box-none'}
            style={styles.castingAdditionalControls}>

            {this.renderAdditionalControls(loading)}

          </View>
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

  slider: {
    position: 'absolute',
    bottom  : 24,
    width   : '100%',
  },

  castButton: {
    position: 'absolute',
    right   : 24,
    top     : 32,
    width   : 50,
    height  : 50,

    zIndex: 1001,
  },

  castingAdditionalControls: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    bottom  : 0,
    right   : 0,
    zIndex  : 1000,
  },

  subsButton: {
    position: 'absolute',
    left    : 18,
    top     : 24,
    width   : 50,
    height  : 50,

    zIndex: 1001,
  },

  stats: {
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom  : 24,
    left    : 16,
    right   : 16,
  },

  statItem: {
    width     : 120,
    alignItems: 'center',
    zIndex    : 1001,
  },

})
