import React from 'react'
import { StyleSheet, Image } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import dimensions from 'modules/dimensions'
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

export const Home = () => {
  React.useEffect(() => {
    SplashScreen.hide()
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

export default Home
