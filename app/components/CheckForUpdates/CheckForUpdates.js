import React from 'react'
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Updater from 'update-react-native-app'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import Logo from 'assets/images/logo.png'

import Typography from '../Typography'
import Button from '../Button'
import Markdown from '../Markdown'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    backgroundColor: colors.BACKGROUND,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginBottom: dimensions.UNIT * 2,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: dimensions.UNIT,
  },

  loader: {
    display: 'flex',
    alignItems: 'center',
  },

  bodyContainer: {
    width: '100%',
    maxHeight: '60%',

    marginTop: dimensions.UNIT * 2,
    paddingLeft: dimensions.UNIT * 2,
    paddingRight: dimensions.UNIT * 2,
  },

  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',

    position: 'absolute',
    bottom: dimensions.UNIT * 2,
    right: 0,
    left: 0,
  },

  action: {
    margin: dimensions.UNIT / 2,
  },
})

export default class CheckForUpdates extends React.Component {

  state = {
    updateAvailable: false,
    animating: false,

    updating: false,
    progress: 0,

    update: null,
    githubRelease: {},
  }

  componentDidMount() {
    const updater = new Updater({
      repo: 'pct-org/native-app',

      onUpdateAvailable: this.onUpdateAvailable,
      onDownloadStart: this.onDownloadStart,
      onProgress: this.onProgress,
    })

    // Don't check for newer versions in dev
    if (!__DEV__) {
      updater.checkUpdate()
    }
  }

  onUpdateAvailable = (githubRelease, update) => {
    this.setState({
      updateAvailable: true,
      animating: true,
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
      animating: true,
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

        <Typography variant={'headline6'}>
          {
            !updating
              ? i18n.t('New version available {{version}}', { version: githubRelease.tag_name })
              : i18n.t('Downloading {{version}}', { version: githubRelease.tag_name })
          }
        </Typography>

        {!updating && githubRelease && githubRelease.body && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.bodyContainer}>
            <Markdown>
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
              color={colors.PRIMARY_COLOR_200} />

            <Typography variant={'caption'}>
              {`${progress}%`}
            </Typography>
          </Animatable.View>
        )}

        {!updating && (
          <View style={styles.actions}>
            <Button
              style={styles.action}
              onPress={this.handleCancelUpdate}>
              {i18n.t('cancel')}
            </Button>

            <Button
              style={styles.action}
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
