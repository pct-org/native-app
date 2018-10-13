import React from 'react'
import { StyleSheet, View, ActivityIndicator, Picker } from 'react-native'
import Orientation from 'react-native-orientation'
import { utils, Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'

import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import Typography from 'components/Typography'
import IconButton from 'components/IconButton'

import colors from 'modules/colors'

import Cover from './Cover'
import Episode from './Episode'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    margin: 8,
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

  playItem = (torrents, episode = {}) => {
    const { navigation: { navigate, state: { params: item } } } = this.props

    navigate('Player', {
      magnet: utils.getBestTorrent(torrents),
      item  : {
        ...item,
        ...episode,
      },
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
    const { activeSeason } = this.state

    return (
      <View style={styles.root}>

        <ScrollViewWithStatusBar>

          <Cover item={item} playMovie={this.playItem} />

          {item && item.summary && (
            <View style={styles.container}>
              <Typography variant={'body1'}>{item.summary}</Typography>
            </View>
          )}

          {item && (
            <View style={styles.container}>
              <IconButton
                onPress={this.handleToggleBookmarks}
                name={item.bookmarked ? 'playlist-add-check' : 'playlist-add'}
                color={'#FFF'}
                size={40}
              />
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
                playItem={this.playItem}
                {...episode} />
            ))
          )}

          <ActivityIndicator color={'#FFF'} size={50} animating={isLoading} hidesWhenStopped />

        </ScrollViewWithStatusBar>

      </View>
    )
  }

}
