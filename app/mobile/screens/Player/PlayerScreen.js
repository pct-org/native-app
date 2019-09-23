import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, StyleSheet, ActivityIndicator, View, BackHandler } from 'react-native'
import { utils } from 'popcorn-sdk'
import Orientation from 'react-native-orientation'

import i18n from 'modules/i18n'

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

    const { navigation: { state: { params: { item } } } } = props

    this.state = {
      item,
      duration: 0.0,
      currentTime: 0.0,
      loading: true,
      casting: false,

      progress: 0,
      buffer: 0,

      downloadSpeed: 0,
      downloadSpeedFormatted: '',

      doneBuffering: false,
      seeds: 0,

      loadedTorrent: null,

      showSubSelector: false,
      activeSub: null,
      subs: null,
    }
  }

  componentDidMount() {
    const { navigation: { state: { params: { torrent, item } } } } = this.props

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  playItem = (torrent = null, url = null, item = null) => {
    const { navigation: { state: { params: { torrent: propsTorrent, item: propsItem } } } } = this.props

    this.setState({
      item: item || propsItem,
      url: url,
      buffer: 0,
      doneBuffering: false,
      loading: true,
      loadedTorrent: torrent || propsTorrent,
    })
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleTorrentStatus = (status) => {
    const nProgress = parseFloat(status.progress)

    if (this.shouldUpdateStatus(status, nProgress)) {
      this.setState({
        ...status,
        progress: nProgress > 99 ? 100 : nProgress,
        doneBuffering: status.buffer === '100',
        downloadSpeed: status.downloadSpeed,

        downloadSpeedFormatted: utils.formatKbToString(status.downloadSpeed),
      })
    }
  }


  getItemTitle = () => {
    const { item } = this.state

    if (item.show) {
      return `${item.show.title} - ${item.title}`
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
    const { casting, doneBuffering, subs, activeSub } = this.state

    return (
      <React.Fragment>

        {!casting && doneBuffering && subs && subs.length > 0 && (
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
      <View style={styles.listContainer}>

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

  listContainer: {
    flex: 1,
    backgroundColor: 'black',
  },

  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  slider: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },

  castButton: {
    position: 'absolute',
    right: 24,
    top: 32,
    width: 50,
    height: 50,

    zIndex: 1001,
  },

  castingAdditionalControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },

  subsButton: {
    position: 'absolute',
    left: 18,
    top: 24,
    width: 50,
    height: 50,

    zIndex: 1001,
  },

  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },

  statItem: {
    width: 120,
    alignItems: 'center',
    zIndex: 1001,
  },

})
