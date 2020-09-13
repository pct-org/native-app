import React from 'react'
import { StyleSheet, Image } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import dimensions from 'modules/dimensions'
import withWatchOnTvManager from 'modules/WatchOnTvManager/withWatchOnTvManager'
import Container from 'components/Container'

import teamImage from 'assets/images/team.png'

export const styles = StyleSheet.create({

  root: {
    flex: 1,
    position: 'relative',

    width: '100%',
  },

  background: {
    ...StyleSheet.absoluteFillObject,

    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT
  },

})

export const Home = ({ watchOnTvManager }) => {
  console.log('render home')

  React.useEffect(() => {
    SplashScreen.hide()

    watchOnTvManager.tvBooted()

    return () => {
      watchOnTvManager.tvOff()
    }
  }, [])

  return (
    <Container style={styles.root}>

      <Image
        source={teamImage}
        resizeMode={'cover'}
        style={styles.background}
      />

    </Container>
  )
}

export default withWatchOnTvManager(Home)
