import React from 'react'
import { StyleSheet, View, ActivityIndicator, Picker } from 'react-native'
import Orientation from 'react-native-orientation'
import { utils, Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'

import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import Typography from 'components/Typography'

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

  state = {
    activeSeason: 0,
  }

  componentDidMount() {
    const { getItem, navigation: { state: { params: item } } } = this.props

    Orientation.lockToPortrait()

    getItem(item.type, item.id).then(({ payload: { type, seasons } }) => {
      if (type === Constants.TYPE_SHOW) {
        this.setState({
          activeSeason: seasons.length - 1,
        })
      }
    })
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

  getSelectedSeason = () => {
    const { item } = this.props

    const { activeSeason } = this.state

    return item.seasons.find(season => season.number === activeSeason)
  }

  getAiredEpisodes = () => {
    const { item, isLoading } = this.props

    if (isLoading || !item || !item.seasons) {
      return []
    }

    const today = Date.now()

    const season = this.getSelectedSeason()

    if (!season) {
      return []
    }

    return season.episodes.filter(episode => episode.aired < today)
  }

  getSeasonsForPicker = () => {
    const { item, isLoading } = this.props

    if (isLoading) {
      return []
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

          {item && item.type === Constants.TYPE_SHOW && (
            <Picker
              mode={'dropdown'}
              selectedValue={activeSeason}
              style={styles.dropDown}
              onValueChange={(itemValue, itemIndex) => this.setState({ activeSeason: itemIndex })}>

              {this.getSeasonsForPicker().map((season, index) => (
                <Picker.Item
                  color={'#FFF'}
                  key={index}
                  label={i18n.t('Season {{number}}', { number: index })}
                  value={index} />
              ))}

            </Picker>
          )}

          {item && item.type === Constants.TYPE_SHOW && (
            this.getAiredEpisodes().map(episode => (
              <Episode
                key={episode.id}
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
