import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'
import SplashScreen from 'react-native-splash-screen'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CardSlider from 'components/CardSlider'
import MyEpisodesSlider from 'components/MyEpisodesSlider'
import MainCover from 'components/MainCover'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'

export const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    position: 'relative',

    width: '100%',
  },

  section: {
    position: 'relative',
    marginTop: dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
  },

  lastSection: {
    marginBottom: dimensions.UNIT * 4,
  },

})

export default class Home extends React.PureComponent {

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    modes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasInternet: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    hasInternet: true,
  }

  state = {
    coreLoading: true,
  }

  componentDidMount() {
    Orientation.lockToPortrait()

    SplashScreen.hide()

    this.loadAllItems()
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  loadAllItems = (callback = null) => {
    const { getItems } = this.props

    Promise.all([
      getItems(Constants.TYPE_MOVIE),
      getItems(Constants.TYPE_SHOW),
      getItems(Constants.TYPE_BOOKMARK),
    ]).then(() => {
      if (callback) {
        callback()
      }

      this.setState({
        coreLoading: false,
      })
    })
  }

  handleEndReached = (mode) => () => {
    const { isLoading, modes, getItems } = this.props

    if (mode === Constants.TYPE_BOOKMARK || isLoading) {
      return
    }

    getItems(mode, modes[mode].page + 1)
  }

  handleGoTo = (to) => () => {
    const { navigation } = this.props

    navigation.navigate(to)
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

  handleMyEpisodesRefresh = () => {
    const { updateMyEpisodes, modes: { myEpisodes } } = this.props

    if (!myEpisodes.loading && !myEpisodes.refreshing) {
      updateMyEpisodes(true)
    }
  }

  getMainCover = () => {
    const movies = this.getMovies(false)

    if (movies.length > 0) {
      return movies[0]
    }

    return null
  }

  getMyList = () => {
    const { modes } = this.props

    const items = modes[Constants.TYPE_BOOKMARK].items.filter(movie => !movie.watched.complete)

    return [...items].reverse()
  }

  getMovies = (withSlice = true) => {
    const { modes } = this.props

    // Don't show movies that we already watched on the home screen
    const movies = modes[Constants.TYPE_MOVIE].items.filter(movie => !movie.watched.complete && !movie.bookmarked)

    if (withSlice) {
      return movies.slice(1)
    }

    return movies
  }

  getShows = () => {
    const { modes } = this.props

    return modes[Constants.TYPE_SHOW].items.filter(show => !show.bookmarked)
  }

  renderMainCover = () => {
    const item = this.getMainCover()

    return (
      <MainCover
        onOpen={this.handleItemOpen}
        onPlay={this.handleItemOpen}
        empty={!item}
        item={item} />
    )
  }

  renderMyList = () => {
    const { coreLoading } = this.state
    const myList = this.getMyList()

    if ((!myList || myList.length === 0) && !coreLoading) {
      return
    }

    return (
      <CardSlider
        style={styles.section}
        onPress={this.handleItemOpen}
        title={i18n.t('My List')}
        goToMore={this.handleGoTo('Bookmarks')}
        items={myList} />
    )
  }

  renderMyEpisodes = () => {
    const { modes: { myEpisodes } } = this.props

    return (
      <MyEpisodesSlider
        style={styles.section}
        onPress={this.handleItemOpen}
        onRefresh={this.handleMyEpisodesRefresh}
        title={i18n.t('My Episodes')}
        refreshing={myEpisodes.refreshing}
        loading={myEpisodes.loading}
        items={myEpisodes.items} />
    )
  }

  renderMoviesList = () => {
    return (
      <CardSlider
        style={styles.section}
        onPress={this.handleItemOpen}
        title={i18n.t('Movies')}
        items={this.getMovies()}
        goToMore={this.handleGoTo('Movies')}
        onEndReached={this.handleEndReached(Constants.TYPE_MOVIE)} />
    )
  }

  renderShowsList = () => {
    return (
      <CardSlider
        style={[styles.section, styles.lastSection]}
        onPress={this.handleItemOpen}
        title={i18n.t('Shows')}
        items={this.getShows()}
        goToMore={this.handleGoTo('Shows')}
        onEndReached={this.handleEndReached(Constants.TYPE_SHOW)} />
    )
  }

  render() {
    const { hasInternet } = this.props

    return (
      <View style={styles.root}>

        {hasInternet && (
          <ScrollViewWithStatusBar>

            {this.renderMainCover()}

            {this.renderMyList()}

            {this.renderMyEpisodes()}

            {this.renderMoviesList()}

            {this.renderShowsList()}

          </ScrollViewWithStatusBar>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
