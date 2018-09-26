import React from 'react'
import { StyleSheet, View } from 'react-native'
import Orientation from 'react-native-orientation'

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

  playItem = () => {
    const { navigation: { navigate, state: { params: item } } } = this.props

    navigate('Player', { magnet: item.torrents['1080p'].url, item })
  }

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  render() {
    const { navigation: { state: { params: item } }, isLoading } = this.props

    return (
      <View style={styles.root}>

        <ScrollViewWithHeader>

          <Cover item={item} playItem={this.playItem} />

          <View style={styles.container}>
            <Typography variant={'body1'}>{item.summary}</Typography>
          </View>

        </ScrollViewWithHeader>

      </View>
    )
  }

}
