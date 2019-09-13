import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Orientation from 'react-native-orientation'
import SplashScreen from 'react-native-splash-screen'
import { Query } from '@apollo/react-components'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CardSlider from 'components/CardSlider'
import MyEpisodesSlider from 'components/MyEpisodesSlider'
import MainCover from 'components/MainCover'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'


import { useQuery } from '@apollo/react-hooks'
import { MoviesAndBookmarksQuery, ShowsQuery } from './HomeQuery'

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

export const Home = ({ navigation, hasInternet = true }) => {
  const [moviesOffset, updateMoviesOffset] = useState(0)
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
  return (
    <View style={styles.root}>

      {hasInternet && (
        <ScrollViewWithStatusBar>

          <Query query={MoviesAndBookmarksQuery} variables={{ offset: moviesOffset }}>
            {({ loading, data, fetchMore }) => {
              console.log('data', data)
              const movies = loading
                ? []
                : [...data.movies].slice(1)

              const mainCover = loading
                ? null
                : data.movies[0]

              return (
                <React.Fragment>
                  <MainCover
                    onOpen={handleItemOpen}
                    onPlay={handleItemOpen}
                    empty={!mainCover}
                    item={mainCover} />

                  <CardSlider
                    style={styles.section}
                    onPress={handleItemOpen}
                    title={i18n.t('My List')}
                    goToMore={handleGoTo('Bookmarks')}
                    items={loading ? [] : data.bookmarks} />

                  <CardSlider
                    style={styles.section}
                    handleItemOpen={handleItemOpen}
                    title={i18n.t('Movies')}
                    items={movies}
                    goToMore={handleGoTo('Movies')}
                    onEndReached={() => fetchMore({
                      variables: moviesOffset + 25,
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                          return prev
                        }

                        return Object.assign({}, prev, {
                          movies: [...prev.movies, ...fetchMoreResult.movies],
                        })
                      },
                    })}
                  />
                </React.Fragment>
              )
            }}
          </Query>

          <Query query={ShowsQuery}>
            {({ loading: loading, data }) => (
              <CardSlider
                style={styles.section}
                handleItemOpen={handleItemOpen}
                title={i18n.t('Shows')}
                items={loading ? [] : data.shows}
                goToMore={handleGoTo('Shows')}
                //onEndReached={this.handleEndReached(Constants.TYPE_MOVIE)}
              />
            )}
          </Query>

        </ScrollViewWithStatusBar>
      )}

      {!hasInternet && (
        <Text>No internet!</Text>
      )}

    </View>
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
