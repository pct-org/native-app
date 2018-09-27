import React from 'react'
import { StyleSheet, View } from 'react-native'
import Orientation from 'react-native-orientation'
import {utils} from 'popcorn-sdk'

import ScrollViewWithHeader from 'components/ScrollViewWithHeader'
import Typography from 'components/Typography'

import Cover from './Cover'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
  },

  container: {
    margin: 10,
  },

})

export default class Item extends React.Component {

  playMovie = () => {
    const { navigation: { navigate, state: { params: item } } } = this.props

    navigate('Player', {
      magnet: utils.getBestTorrent(item.torrents['1080p'], item.torrents['720p']),
      item,
    })
  }

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  render() {
    const { navigation: { state: { params: item } }, isLoading } = this.props

    return (
      <View style={styles.root}>

        <ScrollViewWithHeader>

          <Cover item={item} playMovie={this.playMovie} />

          <View style={styles.container}>
            <Typography variant={'body1'}>{item.summary}</Typography>
          </View>

        </ScrollViewWithHeader>

      </View>
    )
  }

}
