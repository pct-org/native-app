import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, StatusBar } from 'react-native'

import CardList from 'components/CardList'
import MainCover from 'components/MainCover'

import * as HomeConstants from './HomeConstants'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
  },

})

export default class Home extends React.Component {

  componentWillMount() {
    this.load()
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
    const movies = this.getMovies()

    if (movies.length > 0) {
      return movies[0]
    }

    return null
  }

  getMyList = () => {
    return []
  }

  getMovies = () => {
    const { modes } = this.props

    return modes[HomeConstants.MODE_MOVIES].items
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

    const myList = this.getMyList()

    return (
      <View style={styles.root}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.20)"
          animated
        />

        {hasInternet && (
          <ScrollView>

            <MainCover
              onPress={this.handleItemOpen}
              loading={isLoading}
              item={this.getMainCover()} />

            <CardList
              style={{ marginTop: -20 }}
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={'My List'}
              items={this.getMyList()} />

            <CardList
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={'Movies'}
              items={this.getMovies()} />

            <CardList
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={'Shows'}
              items={this.getShows()} />

          </ScrollView>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
