import MyEpisodesQuery from 'modules/GraphQL/MyEpisodesQuery'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import SplashScreen from 'react-native-splash-screen'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import Container from 'components/Container'
import MainSlider from './MainSlider'

export const styles = StyleSheet.create({

  root: {
    flex: 1,
    position: 'relative',

    width: '100%',
  },

  lastSection: {
    marginBottom: dimensions.UNIT * 4,
  },

  castButton: {
    position: 'absolute',
    top: dimensions.STATUSBAR_HEIGHT - (dimensions.UNIT / 4),
    right: dimensions.UNIT * 2 + dimensions.ICON_SIZE_DEFAULT,

    width: dimensions.ICON_CAST_SIZE,
    height: dimensions.ICON_CAST_SIZE,
    tintColor: colors.ICON.WHITE,
  },

})

export const Home = ({ navigation }) => {
  // TODO:: Get MyEpisodes
  // TODO:: Get Downloads
  // TODO:: If there are my episodes make slider
  // else just show swim lane with items
  const [state, setState] = React.useState({
    activeItem: null,
    activeItemIndex: -1,
  })

  const { data, called, loading } = useQuery(
    MyEpisodesQuery,
  )

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  React.useEffect(() => {
    if (data && data.episodes) {
      handleNextActiveItem()
    }
  }, [data])

  const handleNextActiveItem = React.useCallback((item = null) => {
    const { activeItemIndex } = state

    if (item) {
      setState({
        activeItem: item,
        activeItemIndex: 0,
      })

    } else if ((activeItemIndex + 1) < data.episodes.length) {
      setState({
        activeItem: data.episodes[activeItemIndex + 1],
        activeItemIndex: activeItemIndex + 1,
      })
    } else {
      setState({
        activeItem: data.episodes[0],
        activeItemIndex: 0,
      })
    }
  }, [data, state])

  return (
    <Container style={styles.root}>

      <MainSlider
        activeItem={state.activeItem}
        nextItem={handleNextActiveItem}
        items={data?.episodes ?? []} />

    </Container>
  )
}

export default Home
