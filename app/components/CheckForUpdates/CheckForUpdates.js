import Logo from 'images/logo.png'
import React from 'react'
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Updater from 'update-react-native-app'
import Markdown from 'react-native-markdown-renderer'
import { material } from 'react-native-typography'

import i18n from 'modules/i18n'

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

  title: {
    marginBottom: 16,
  },

  logo: {
    width       : 100,
    height      : 100,
    marginBottom: 8,
  },

  loader: {
    display   : 'flex',
    alignItems: 'center',
  },

  bodyContainer: {
    width    : '100%',
    maxHeight: '30%',

    paddingLeft : 16,
    paddingRight: 16,
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

  heading2: material.titleWhiteObject,

  text: material.body1WhiteObject,

})

export default class CheckForUpdates extends React.Component {

  state = {
    updateAvailable: false,
    animating      : false,

    updating: false,
    progress: 0,

    update       : null,
    githubRelease: {},
  }

  componentDidMount() {
    const updater = new Updater({
      repo: 'tripss/popcorn-native',

      onUpdateAvailable: this.onUpdateAvailable,
      onDownloadStart  : this.onDownloadStart,
      onProgress       : this.onProgress,
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

  onProgress = (progress) => {
    this.setState({
      progress,
    })
  }

  handleCancelUpdate = () => {
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
    const { updateAvailable, githubRelease } = this.state
    const { update, animating, updating, progress } = this.state

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

        <Typography variant={'headline'} style={styles.title}>
          {i18n.t('New version available {{version}}', { version: githubRelease.name })}
        </Typography>

        {!updating && githubRelease && githubRelease.body && (
          <ScrollView style={styles.bodyContainer}>
            <Markdown style={mdStyle}>
              {githubRelease.body}
            </Markdown>
          </ScrollView>
        )}

        {updating && (
          <Animatable.View
            style={styles.loader}
            animation={'fadeIn'}
            duration={500}
            useNativeDriver>
            <ActivityIndicator
              size={40}
              style={{ marginBottom: 8 }}
              color={'#FFF'} />

            <Typography variant={'caption'}>
              {`${progress}%`}
            </Typography>
          </Animatable.View>
        )}

        {!updating && (
          <View style={styles.actions}>
            <Button
              onPress={this.handleCancelUpdate}>
              {i18n.t('cancel')}
            </Button>

            <Button
              variant={'primary'}
              onPress={update}>
              {i18n.t('update')}
            </Button>
          </View>
        )}
      </Animatable.View>
    )
  }
}
