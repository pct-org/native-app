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
    const { navigation } = this.props

    navigation.navigate(to)
  }

  const handleItemOpen = (item) => {
    const { navigation } = this.props

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
        handleItemOpen={handleItemOpen}
        styles={styles}
      />

      <CardSlider
        style={styles.section}
        handleItemOpen={handleItemOpen}
        title={i18n.t('Movies')}
        items={noMoviesYet ? [] : movies}
        goToMore={handleGoTo('Movies')}
        onEndReached={fetchMoreUpdateQuery('movies', moviesData, moviesFetchMore)}
      />

      <ShowsSlider
        handleGoTo={handleGoTo}
        handleItemOpen={handleItemOpen}
        styles={styles}
      />

    </ScrollViewWithStatusBar>
  )
}

export default Home

/*export default class Home extends React.PureComponent {

 static propTypes = {
 navigation: PropTypes.object.isRequired,
 }


 componentDidMount() {
 Orientation.lockToPortrait()
 SplashScreen.hide()

 }

 componentWillUnmount() {
 Orientation.unlockAllOrientations()
 }

 handleGoTo = (to) => () => {
 const { navigation } = this.props

 navigation.navigate(to)
 }

 handleItemOpen = (item) => {
 const { navigation } = this.props

 navigation.navigate('Item', item)
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

 renderMyEpisodes = () => {
 const { modes: { myEpisodes } } = this.props

 return

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

 const { loading, error, data } = useQuery(MyListQuery)

 return (
 <View style={styles.root}>

 {hasInternet && (
 <ScrollViewWithStatusBar>

 {this.renderMainCover()}

 <MyList
 styles={styles}
 handleGoTo={this.handleGoTo}
 handleItemOpen={this.handleItemOpen}
 />

 <CardSlider
 style={styles.section}
 onPress={this.handleItemOpen}
 title={i18n.t('Movies')}
 items={this.getMovies()}
 goToMore={this.handleGoTo('Movies')}
 onEndReached={this.handleEndReached(Constants.TYPE_MOVIE)} />

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

 }*/
