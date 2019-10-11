import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    zIndex: 2000,
    width: dimensions.ICON_CAST_SIZE,
    height: dimensions.ICON_CAST_SIZE,
  },

  castButton: {
    width: dimensions.ICON_CAST_SIZE,
    height: dimensions.ICON_CAST_SIZE,
    tintColor: colors.PRIMARY_COLOR_200,
  },

})

export default class PlayerManager extends React.Component {

  state = {
    currentTime: 0,
    casting: false,
  }

  componentDidMount() {
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, this.handleCastSessionStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, this.handleCastSessionEnded)
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED, this.handleMediaPlaybackStarted)
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED, this.handleMediaProgressUpdate)

    GoogleCast.getCastState().then((state) => {
      if (state.toLowerCase() === 'connected') {
        this.setState({
          casting: true,
        })
      }
    })
  }

  componentWillUnmount() {
    const { casting } = this.state

    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_ENDED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_PLAYBACK_STARTED)
    GoogleCast.EventEmitter.removeAllListeners(GoogleCast.MEDIA_PROGRESS_UPDATED)

    if (casting) {
      // Stop casting but keep the connection
      GoogleCast.stop()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isBuffering: wasBuffering } = prevProps
    const { isBuffering } = this.props

    if (wasBuffering && !isBuffering) {
      // Buffering is done, check if we need to cast it
      this.handleStartCasting()
    }
  }

  handleStartCasting = (force = false) => {
    const { item } = this.props
    const { casting } = this.state
console.log('handleStartCasting', casting)
    if (force || casting) {
      Orientation.lockToPortrait()

      console.log(`http://192.168.1.67:3000/watch/${item._id}`)

      GoogleCast.castMedia({
        title: (
          item.type === 'episode'
            ? `${item.show.title}: ${item.number}. ${item.title}`
            : item.title
        ),
        subtitle: item.synopsis,
        mediaUrl: `http://192.168.1.67:3000/watch/${item._id}`,
        posterUrl: item.type === 'episode'
          ? item.show.images.poster.high
          : item.images.poster.high,
      })
    }
  }

  handleCastSessionStarted = () => {
    this.handleStartCasting(true)
  }

  handleCastSessionEnded = () => {
    console.log('handleCastSessionEnded')
    this.setState({
      casting: false,
    })
  }

  handleMediaPlaybackStarted = () => {
    const { currentTime } = this.state

    if (currentTime) {
      GoogleCast.seek(currentTime)
    }
  }

  handleMediaProgressUpdate = (...a) => {
    console.log(a)
  }

  handleSetCurrentTime = (currentTime) => {
    this.setState({
      currentTime,
    })
  }

  renderCastButton = (style = {}) => {
    return (
      <View
        style={[styles.container, style]}
        pointerEvents={'box-none'}>
        <CastButton style={styles.castButton} />
      </View>
    )
  }

  render() {
    const { style, children } = this.props
    const { casting } = this.state

    return (
      <View style={style}>

        {children({
          casting,
          renderCastButton: this.renderCastButton,
          setCurrentTime: this.handleSetCurrentTime,
        })}

      </View>
    )
  }
}
