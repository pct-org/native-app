import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import dimensions from 'modules/dimensions'
import React from 'react'
import { Text, View, FlatList, TVEventHandler } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Constants } from 'popcorn-sdk'

import colors from 'modules/colors'
import i18n from 'modules/i18n'

import CardSlider from 'components/CardSlider'

import HomeScreenBase from '../Home/HomeScreen'

export const styles = {

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    position: 'relative',

    width: '100%',
    height: '100%',
  },

  listContainer: {},

  sectionContainer: {
    position: 'absolute',
    bottom: -20,
    height: '45%',
  },

  section: {
    // paddingLeft: dimensions.UNIT * 10,
    height: '50%',
    marginTop: dimensions.UNIT,
  },
}

export default class Home extends HomeScreenBase {

  state = {
    coreLoading: true,

    activeRow: -1,
  }

  componentDidMount() {
    SplashScreen.hide()

    this.loadAllItems()

    this._tvEventHandler = new TVEventHandler()
    this._tvEventHandler.enable(this, (cmp, evt) => {
      console.log(evt)

      const { activeRow } = this.state

      if (evt.eventType === 'down' && this.flatListRef) {
        if (activeRow + 1 === 4) {
          return
        }

        this.flatListRef.scrollToIndex({
          index: activeRow + 1,
          viewOffset: 125,
        })

        this.setState({
          activeRow: activeRow + 1,
        })
      }

      if (evt.eventType === 'up' && this.flatListRef) {
        if (activeRow - 1 === -1) {
          return
        }

        this.flatListRef.scrollToIndex({
          index: activeRow - 1,
          viewOffset: 125,
        })

        this.setState({
          activeRow: activeRow - 1,
        })
      }

    })
  }

  getMovies = (withSlice = true) => {
    const { modes } = this.props

    // Don't show movies that we already watched on the home screen
    return modes[Constants.TYPE_MOVIE].items.filter(movie => !movie.watched.complete && !movie.bookmarked)
  }

  renderItem = ({ item }) => {
    if (item.type === 'myEpisodes') {
      return this.renderMyEpisodes()

    } else if (item.type === 'movies') {
      return this.renderMoviesList()

    } else if (item.type === 'myList') {
      return this.renderMyList()
    }

    return this.renderShowsList()
  }

  // TODO:: Let it look like offical popcorn tv app
  render() {
    const { hasInternet } = this.props

    return (
      <View style={styles.root}>

        {hasInternet && (
          <FlatList
            removeClippedSubviews
            ListHeaderComponent={() => <View style={{ height: 125 }} />}
            ListFooterComponent={() => <View style={{ height: 125 }} />}
            data={[
              { type: 'myEpisodes' },
              { type: 'movies' },
              { type: 'shows' },
              { type: 'myList' },
            ]}
            ref={ref => this.flatListRef = ref}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
