import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'

import CardList from 'components/CardList'
import MainCover from 'components/MainCover'
import FullScreenLoading from 'components/FullScreenLoading'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
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

  state = {
    loading: true,
  }

  componentDidMount() {
    const { getItems } = this.props

    Orientation.lockToPortrait()

    getItems(Constants.TYPE_MOVIE)
    getItems(Constants.TYPE_SHOW)
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

  handleCoverLoaded = () => this.setState({ loading: false })

  getMainCover = () => {
    const movies = this.getMovies(false)

    if (movies.length > 0) {
      return movies[0]
    }

    return null
  }

  getMyList = () => []

  getMovies = (withSlice = true) => {
    const { modes } = this.props

    const movies = modes[Constants.TYPE_MOVIE].items

    if (withSlice) {
      return movies.slice(1, 11)
    }

    return movies
  }

  getShows = () => {
    const { modes } = this.props

    return modes[Constants.TYPE_SHOW].items.slice(0, 10)
  }

  render() {
    const { isLoading, hasInternet } = this.props
    const { loading } = this.state

    return (
      <View style={styles.root}>

        <FullScreenLoading enabled={isLoading || loading} />

        {hasInternet && (
          <ScrollViewWithStatusBar>

            <MainCover
              onPress={this.handleItemOpen}
              loading={isLoading}
              onLoad={this.handleCoverLoaded}
              item={this.getMainCover()} />

            <CardList
              style={{ marginTop: -20, marginBottom: 20 }}
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={i18n.t('Movies')}
              items={this.getMovies()} />

            <CardList
              style={{ marginBottom: 20 }}
              onPress={this.handleItemOpen}
              loading={isLoading}
              title={i18n.t('Shows')}
              items={this.getShows()} />

          </ScrollViewWithStatusBar>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
