import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import Orientation from 'react-native-orientation'
import SplashScreen from 'react-native-splash-screen'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import CardSlider from 'components/CardSlider'
import MainCover from 'components/MainCover'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'


import MoviesQuery from './MoviesQuery'
import ShowsSlider from './ShowsSlider'
import BookmarksSlider from './BookmarksSlider'

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

export const Home = ({ navigation }) => {
  const { loading: moviesLoading, data: moviesData, fetchMore: moviesFetchMore } = useQuery(
    MoviesQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  useEffect(() => {
    Orientation.lockToPortrait()
    SplashScreen.hide()

    return () => {
      Orientation.unlockAllOrientations()
    }
  })

  const handleGoTo = (to) => () => {
    navigation.navigate(to)
  }

  const handleItemOpen = (item) => {
    console.log('handleItemOpen', item, navigation)

    navigation.navigate('Item', item)
  }

  const noMoviesYet = !moviesData || !moviesData.movies

  const movies = noMoviesYet
    ? null
    : [...moviesData.movies].slice(1)

  const mainCover = noMoviesYet
    ? null
    : moviesData.movies[0]

  return (
    <ScrollViewWithStatusBar style={styles.root}>

      <MainCover
        onOpen={handleItemOpen}
        onPlay={handleItemOpen}
        empty={!mainCover}
        item={mainCover} />

      <BookmarksSlider
        handleGoTo={handleGoTo}
        onPress={handleItemOpen}
        styles={styles}
      />

      <CardSlider
        style={styles.section}
        onPress={handleItemOpen}
        title={i18n.t('Movies')}
        items={noMoviesYet ? [] : movies}
        goToMore={handleGoTo('Movies')}
        onEndReached={fetchMoreUpdateQuery('movies', moviesData, moviesFetchMore)}
      />

      <ShowsSlider
        handleGoTo={handleGoTo}
        onPress={handleItemOpen}
        styles={styles}
      />

    </ScrollViewWithStatusBar>
  )
}

export default Home
