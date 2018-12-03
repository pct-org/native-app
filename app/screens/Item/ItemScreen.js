import React from 'react'
import { StyleSheet, View, ActivityIndicator, Picker } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'
import colors from 'modules/colors'

import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import Typography from 'components/Typography'
import IconButton from 'components/IconButton'

import Cover from './Cover'
import Episode from './Episode'
import QualitySelector from './QualitySelector'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    display      : 'flex',
    flexDirection: 'row',
  },

  iconsContainer: {
    marginTop   : 24,
    marginBottom: 24,
  },

  icon: {
    minWidth : 100,
    textAlign: 'center',
  },

  dropDown: {
    margin: 8,

    height         : 50,
    width          : 150,
    backgroundColor: colors.BACKGROUND_LIGHTER,
  },

})

export default class Item extends React.Component {

  static getDerivedStateFromProps(nextProps, state) {
    const { item: nextItem } = nextProps
    const { activeSeason } = state

    // If we retrieve more season then update to the latest one
    if (nextItem && nextItem.seasons && nextItem.seasons.length > activeSeason) {
      return {
        activeSeason: nextItem.seasons[nextItem.seasons.length - 1].number,
      }
    }

    return null
  }

  state = {
    activeSeason: null,

    selectFromTorrents: null,
    episodeToPlay     : {},
  }

  componentDidMount() {
    const { getItem, navigation: { state: { params: item } } } = this.props

    Orientation.lockToPortrait()

    getItem(item.type, item.id).then(({ payload: { type, seasons } }) => {
      if (type === Constants.TYPE_SHOW && seasons.length > 0) {
        this.setState({
          activeSeason: seasons[seasons.length - 1].number,
        })
      }
    })
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

  playItem = (magnet) => {
    const { navigation: { navigate, state: { params: item } } } = this.props
    const { episodeToPlay } = this.state

    navigate('Player', {
      magnet,
      item: {
        ...item,
        ...episodeToPlay,
      },
    })
  }

  selectQuality = (torrents, episode = {}) => {
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

  getAiredEpisodes = () => {
    const { activeSeason } = this.state
    const today = Date.now()

    if (!activeSeason) {
      return []
    }

    const season = this.getSeasons(activeSeason)

    if (!season) {
      return []
    }

    return season.episodes.filter(episode => episode.aired < today)
  }

  getSeasons = (seasonNr = null) => {
    const { item } = this.props

    if (!item || !item.seasons || item.seasons.length === 0) {
      if (seasonNr) {
        return null
      }

      return []
    }

    if (seasonNr) {
      return item.seasons.find(season => season.number === seasonNr)
    }

    return item.seasons
  }

  render() {
    const { item, isLoading } = this.props
    const { activeSeason, selectFromTorrents } = this.state

    return (
      <View style={styles.root}>

        <ScrollViewWithStatusBar>

          <Cover item={item} playMovie={this.selectQuality} />

          {item && item.summary && (
            <View style={styles.container}>
              <Typography variant={'body1'}>{item.summary}</Typography>
            </View>
          )}

          {item && (
            <View style={[styles.container, styles.iconsContainer]}>
              <IconButton
                style={styles.icon}
                onPress={this.handleToggleBookmarks}
                name={item.bookmarked ? 'check' : 'plus'}
                color={'#FFF'}
                size={40}>
                {i18n.t('My List')}
              </IconButton>

              {item && item.type === Constants.TYPE_MOVIE && (
                <IconButton
                  style={styles.icon}
                  onPress={this.handleToggleWatched}
                  name={item.watched.complete ? 'eye-off-outline' : 'eye-outline'}
                  color={'#FFF'}
                  size={40}>
                  {i18n.t(item.watched.complete ? 'Mark Unwatched' : 'Mark Watched')}
                </IconButton>
              )}
            </View>
          )}

          {item && item.type === Constants.TYPE_SHOW && (
            <Picker
              mode={'dropdown'}
              selectedValue={activeSeason}
              style={styles.dropDown}
              onValueChange={(itemValue) => this.setState({ activeSeason: itemValue })}>

              {this.getSeasons().map(season => (
                <Picker.Item
                  color={'#FFF'}
                  key={season.number}
                  label={i18n.t('Season {{number}}', { number: season.number })}
                  value={season.number} />
              ))}

            </Picker>
          )}

          {item && item.type === Constants.TYPE_SHOW && (
            this.getAiredEpisodes().map(episode => (
              <Episode
                key={episode.key}
                playItem={this.selectQuality}
                {...episode} />
            ))
          )}

          <ActivityIndicator color={'#FFF'} size={50} animating={isLoading} hidesWhenStopped />

        </ScrollViewWithStatusBar>

        <QualitySelector
          cancel={this.cancelQualitySelect}
          torrents={selectFromTorrents}
          playItem={this.playItem} />

      </View>
    )
  }

}
