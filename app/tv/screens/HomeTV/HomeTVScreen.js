import MyEpisodesSlider from 'components/MyEpisodesSlider/MyEpisodesSlider'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import dimensions from 'modules/dimensions'
import React from 'react'
import { Text, View, FlatList, TVEventHandler, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import SplashScreen from 'react-native-splash-screen'
import { Constants } from 'popcorn-sdk'

import colors from 'modules/colors'

import i18n from 'modules/i18n'

import CardSlider from 'components/CardSlider'
import TvHeader from 'tv/components/TvHeader'
import Image from 'components/Image'
import Overlay from 'components/Overlay'
import Typography from 'components/Typography'
import MainCover from 'components/MainCover'

import HomeScreenBase from 'screens/Home/HomeScreen'

export const styles = {

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    position: 'relative',

    width: '100%',
    height: '100%',
  },

  firstSection: {
    position: 'relative',
    marginTop: -(dimensions.UNIT * 10),
    marginBottom: dimensions.UNIT * 2,
  },

}

export default class Home extends HomeScreenBase {

  state = {
    coreLoading: true,

    activeRow: -1,
  }

  componentDidMount() {
    SplashScreen.hide()

    // this.loadAllItems()
  }

  renderMoviesList = () => {
    return (
      <CardSlider
        style={styles.firstSection}
        onPress={this.handleItemOpen}
        title={i18n.t('Movies')}
        items={this.getMovies()}
        onEndReached={this.handleEndReached(Constants.TYPE_MOVIE)} />
    )
  }

  render() {
    const { hasInternet } = this.props

    return (
      <View style={styles.root}>

        {hasInternet && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>

            <TvHeader />

            {this.renderMainCover()}

{/*            {this.renderMyList()}*/}

            {this.renderMoviesList()}

          </ScrollView>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
