import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Orientation from 'react-native-orientation'

import CardList from 'components/CardList'
import MainCover from 'components/MainCover'
import ScrollViewWithHeader from 'components/ScrollViewWithHeader'

import * as HomeConstants from './HomeConstants'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
    position       : 'relative',
  },

})

export default class Home extends React.Component {

  componentWillMount() {
    this.load()
  }

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  load = () => {
    const { isLoading, getItems } = this.props

    if (!isLoading) {
      getItems(HomeConstants.MODE_MOVIES)
    }
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

  getMainCover = () => {
    const movies = this.getMovies(false)

    if (movies.length > 0) {
      return movies[0]
    }

    return null
  }

  getMyList = () => {
    return []
  }

  getMovies = (withSlice = true) => {
    const { modes } = this.props

    const movies = modes[HomeConstants.MODE_MOVIES].items

    if (withSlice) {
      return movies.slice(1, 21)
    }

    return movies
  }

  getShows = () => {
    return []
  }

  render() {
    const { isLoading, hasInternet } = this.props

    if (isLoading) {
      return (
        <Text>Loading...</Text>
      )
    }

    return (
      <View style={styles.root}>

        {hasInternet && (
          <ScrollViewWithHeader>

            <MainCover
              onPress={this.handleItemOpen}
              loading={isLoading}
              item={this.getMainCover()} />

            <CardList
              style={{ marginTop: -20, marginBottom: 20 }}
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={'Movies'}
              items={this.getMovies()} />

          </ScrollViewWithHeader>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
