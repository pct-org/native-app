import React from 'react'
import { StyleSheet, View, ActivityIndicator, Picker } from 'react-native'
import Orientation from 'react-native-orientation'
import { utils, Constants } from 'popcorn-sdk'

import ScrollViewWithHeader from 'components/ScrollViewWithHeader'
import Typography from 'components/Typography'

import Cover from './Cover'
import Episode from './Episode'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
  },

  container: {
    margin: 16,
  },

  dropDown: {
    margin: 16,

    height         : 50,
    width          : 150,
    backgroundColor: '#242424',
  },

})

export default class Item extends React.Component {

  state = {
    activeSeason: 0,
  }

  componentWillMount() {
    const { getItem, navigation: { state: { params: item } } } = this.props

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

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  getAiredEpisodes = () => {
    const { item, isLoading } = this.props
    const { activeSeason } = this.state

    if (isLoading || !item) {
      return []
    }

    const today = Date.now()

    return item.seasons[activeSeason].episodes.filter(episode => episode.aired < today)
  }

  render() {
    const { item, isLoading } = this.props
    const { activeSeason } = this.state

    return (
      <View style={styles.root}>

        <ScrollViewWithHeader>

          <Cover item={item} playMovie={this.playItem} />

          {item && (
            <View style={styles.container}>
              <Typography variant={'body1'}>{item.summary}</Typography>
            </View>
          )}

          <ActivityIndicator color={'#FFF'} size={50} animating={isLoading} hidesWhenStopped />

          {!isLoading && item && item.type === Constants.TYPE_SHOW && (
            <Picker
              mode={'dropdown'}
              selectedValue={activeSeason}
              style={styles.dropDown}
              onValueChange={(itemValue, itemIndex) => this.setState({ activeSeason: itemIndex })}>

              {item.seasons.map((season, index) => (
                <Picker.Item color={'#FFF'} key={season.title} label={season.title} value={index} />
              ))}

            </Picker>
          )}

          {!isLoading && item && item.type === Constants.TYPE_SHOW && (
            this.getAiredEpisodes().map(episode => (
              <Episode
                key={episode.id}
                playItem={this.playItem}
                {...episode} />
            ))
          )}

        </ScrollViewWithHeader>

      </View>
    )
  }

}
