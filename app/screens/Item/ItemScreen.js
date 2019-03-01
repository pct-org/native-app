import React from 'react'
import { StyleSheet, View, ActivityIndicator, Linking, BackHandler } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'
import colors from 'modules/colors'

import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import Typography from 'components/Typography'
import IconButton from 'components/IconButton'

import Cover from './Cover'
import QualitySelector from 'components/QualitySelector'
import ItemOrRecommendations from './ItemOrRecommendations'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    display      : 'flex',
    flexDirection: 'row',
    marginLeft   : 8,
    marginTop    : 8,
  },

  iconsContainer: {
    marginTop   : 24,
    marginBottom: 24,

    minHeight: 70,
  },

  icon: {
    minWidth : 80,
    textAlign: 'center',
  },

})

export default class Item extends React.PureComponent {

  state = {
    selectFromTorrents: null,
    episodeToPlay     : null,
  }

  componentDidMount() {
    Orientation.lockToPortrait()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    this.getItem()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    const { selectFromTorrents } = this.state

    if (selectFromTorrents !== null) {
      this.setState({
        selectFromTorrents: null,
      })

      return true
    }

    return false
  }

  handleToggleBookmarks = () => {
    const { item, addToBookmarks, removeFromBookmarks } = this.props

    if (item.bookmarked) {
      removeFromBookmarks(item)

    } else {
      addToBookmarks(item)
    }
  }

  handleToggleWatched = () => {
    const { item, markWatched, markUnwatched } = this.props

    if (item.watched.complete) {
      markUnwatched(item)

    } else {
      markWatched(item)
    }
  }

  getItem = (fetchThisItem = null) => {
    const { getItem, navigation: { state: { params: item } } } = this.props

    getItem(fetchThisItem || item).then(({ payload: { type, seasons } }) => {
      if (type === Constants.TYPE_SHOW && seasons.length > 0) {
        this.setState({
          activeSeason: seasons[seasons.length - 1].number,
        })
      }
    })
  }

  handleTrailer = () => {
    const { item } = this.props

    if (item.trailer) {
      Linking.openURL(item.trailer)
    }
  }

  playItem = (torrent) => {
    const { navigation: { navigate }, item } = this.props
    const { episodeToPlay } = this.state

    this.setState({
      selectFromTorrents: null,
    })

    let playItem = item

    if (episodeToPlay) {
      playItem = {
        ...episodeToPlay,
        show: playItem,
      }
    }

    navigate('Player', {
      torrent,
      item: playItem
    })
  }

  selectQuality = (torrents, episode = null) => {
    this.setState({
      selectFromTorrents: torrents,

      episodeToPlay: episode,
    })
  }

  cancelQualitySelect = () => {
    this.setState({
      selectFromTorrents: null,
    })
  }

  render() {
    const { item, isLoading } = this.props
    const { selectFromTorrents } = this.state

    return (
      <View style={styles.root}>

        <ScrollViewWithStatusBar>

          <Cover item={item} playMovie={this.selectQuality} />

          {item && item.summary && (
            <View style={styles.container}>
              <Typography variant={'body2'}>
                {item.summary}
              </Typography>
            </View>
          )}

          {item && (
            <View style={[styles.container, styles.iconsContainer]}>
              {!isLoading && (
                <IconButton
                  animatable={{
                    animation: 'fadeIn',
                  }}
                  style={styles.icon}
                  onPress={this.handleToggleBookmarks}
                  name={item.bookmarked ? 'check' : 'plus'}
                  color={'#FFF'}
                  size={40}>
                  {i18n.t('My List')}
                </IconButton>
              )}

              {item && item.type === Constants.TYPE_MOVIE && (
                <IconButton
                  animatable={{
                    animation: 'fadeIn',
                  }}
                  style={[styles.icon, { minWidth: 95 }]}
                  onPress={this.handleToggleWatched}
                  name={item.watched.complete ? 'eye-off-outline' : 'eye-outline'}
                  color={'#FFF'}
                  size={40}>
                  {i18n.t(item.watched.complete ? 'Mark Unwatched' : 'Mark Watched')}
                </IconButton>
              )}

              {item && item.trailer && (
                <IconButton
                  animatable={{
                    animation: 'fadeIn',
                  }}
                  style={styles.icon}
                  onPress={this.handleTrailer}
                  name={'youtube'}
                  color={'#FFF'}
                  size={40}>
                  {i18n.t('Trailer')}
                </IconButton>
              )}
            </View>
          )}

          {item && item.type === Constants.TYPE_SHOW && (
            <ItemOrRecommendations
              item={item}
              playItem={this.selectQuality}
              getItem={this.getItem}
            />
          )}

          {isLoading && (
            <ActivityIndicator color={'#FFF'} size={50} animating={isLoading} hidesWhenStopped />
          )}

        </ScrollViewWithStatusBar>

        <QualitySelector
          cancel={this.cancelQualitySelect}
          torrents={selectFromTorrents}
          playItem={this.playItem} />

      </View>
    )
  }

}
