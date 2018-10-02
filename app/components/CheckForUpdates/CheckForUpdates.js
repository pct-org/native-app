import Logo from 'images/logo.png'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Updater from 'update-react-native-app'
import Markdown from 'react-native-markdown-renderer'
import { material } from 'react-native-typography'

import Typography from '../Typography'
import Button from '../Button'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top     : 0,
    bottom  : 0,
    right   : 0,
    left    : 0,

    backgroundColor: '#242424',

    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
  },

  logo: {
    width       : 100,
    height      : 100,
    marginBottom: 8,
  },

  actions: {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    width         : '100%',
    flexDirection : 'row',

    position: 'absolute',
    bottom  : 16,
    right   : 0,
    left    : 0,
  },
})

export const mdStyle = StyleSheet.create({

  heading2: {
    ...material.titleWhiteObject,

    width: '90%',
  },

  text: material.body1WhiteObject,

})

export default class CheckForUpdates extends React.Component {

  state = {
    updateAvailable: false,
    animating      : false,

    updating: false,

    update       : null,
    githubRelease: {},
  }

  componentDidMount() {
    const updater = new Updater({
      repo: 'tripss/popcorn-native',

      onUpdateAvailable: this.onUpdateAvailable,
      onDownloadStart  : this.onDownloadStart,
      onProgress       : (per) => console.log('onProgress', per),
    })

    // Don't check for newer versions in dev
    if (!__DEV__) {
      updater.checkUpdate()
    }
  }

  onUpdateAvailable = (githubRelease, update) => {
    this.setState({
      updateAvailable: true,
      animating      : true,
      githubRelease,
      update,
    })
  }

  onDownloadStart = () => {
    this.setState({
      updating: true,
    })
  }

  cancelUpdate = () => {
    this.setState({
      updateAvailable: false,
      animating      : true,
    })
  }

  handleAnimationEnd = () => {
    this.setState({
      animating: false,
    })
  }

  render() {
    const { updateAvailable, githubRelease, update, animating, updating } = this.state

    if (!updateAvailable && !animating && !updating) {
      return null
    }

    return (
      <Animatable.View
        animation={updateAvailable ? 'fadeIn' : 'fadeOut'}
        duration={500}
        style={styles.root}
        onAnimationEnd={this.handleAnimationEnd}
        useNativeDriver>

        <Image
          style={styles.logo}
          source={Logo} />

        <Typography variant={'headline'}>
          New version available {githubRelease.name}
        </Typography>

        {!updating && githubRelease && githubRelease.body && (
          <Markdown style={mdStyle}>
            {githubRelease.body}
          </Markdown>
        )}

        {updating && (
          <Animatable.View
            animation={'fadeIn'}
            duration={500}
            useNativeDriver>
            <ActivityIndicator
              size={40}
              style={styles.loader}
              color={'#FFF'} />
          </Animatable.View>
        )}

        {!updating && (
          <View style={styles.actions}>
            <Button
              onPress={this.cancelUpdate}>
              cancel
            </Button>

            <Button
              variant={'primary'}
              onPress={update}>
              update
            </Button>
          </View>
        )}
      </Animatable.View>
    )
  }
}
