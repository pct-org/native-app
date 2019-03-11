import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'
import SplashScreen from 'react-native-splash-screen'

import i18n from 'modules/i18n'
import colors from 'modules/colors'

import CardSlider from 'components/CardSlider'
import MainCover from 'components/MainCover'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
    position       : 'relative',
  },

})

export default class Home extends React.PureComponent {

  static propTypes = {
    getItems   : PropTypes.func.isRequired,
    modes      : PropTypes.object.isRequired,
    isLoading  : PropTypes.bool.isRequired,
    hasInternet: PropTypes.bool,
    navigation : PropTypes.object.isRequired,
  }

  static defaultProps = {
    hasInternet: true,
  }

  componentDidMount() {
    const { getItems } = this.props

    Orientation.lockToPortrait()

    getItems(Constants.TYPE_MOVIE)
    getItems(Constants.TYPE_SHOW)
    getItems(Constants.TYPE_BOOKMARK)
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

  handleCoverLoaded = () => {
    SplashScreen.hide()
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

    return modes[Constants.TYPE_BOOKMARK].items.filter(movie => !movie.watched.complete).slice(0, 10)
  }

  getMovies = (withSlice = true) => {
    const { modes } = this.props

    // Don't show movies that we already watched on the home screen
    const movies = modes[Constants.TYPE_MOVIE].items.filter(movie => !movie.watched.complete && !movie.bookmarked)

    if (withSlice) {
      return movies.slice(1, 11)
    }

    return movies
  }

  getShows = () => {
    const { modes } = this.props

    return modes[Constants.TYPE_SHOW].items.filter(show => !show.bookmarked).slice(0, 10)
  }

  getMyListCardProps = () => ({})

  getMoviesListCardProps = () => ({})

  getShowListCardProps = () => ({})

  renderMainCover = () => {
    const { isLoading } = this.props

    return (
      <MainCover
        onPress={this.handleItemOpen}
        loading={isLoading}
        onLoad={this.handleCoverLoaded}
        item={this.getMainCover()} />
    )
  }

  renderMyList = () => {
    const { isLoading } = this.props
    const myList = this.getMyList()

    if (!myList || myList.length === 0) {
      return
    }

    return (
      <CardSlider
        style={{ marginTop: -20, marginBottom: 8 }}
        onPress={this.handleItemOpen}
        loading={isLoading}
        title={i18n.t('My List')}
        items={myList}
        cardProps={this.getMyListCardProps()} />
    )
  }

  renderMoviesList = () => {
    const { isLoading } = this.props
    const myList = this.getMyList()

    return (
      <CardSlider
        style={{
          marginTop   : myList.length > 0 ? 0 : -20,
          marginBottom: 8,
        }}
        onPress={this.handleItemOpen}
        loading={isLoading}
        title={i18n.t('Movies')}
        items={this.getMovies()}
        cardProps={this.getMoviesListCardProps()} />
    )
  }

  renderShowsList = () => {
    const { isLoading } = this.props

    return (
      <CardSlider
        style={{ marginBottom: 16 }}
        onPress={this.handleItemOpen}
        loading={isLoading}
        title={i18n.t('Shows')}
        items={this.getShows()}
        cardProps={this.getShowListCardProps()} />
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
