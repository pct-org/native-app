import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import GoogleCast, { CastButton } from 'react-native-google-cast'
import Orientation from 'react-native-orientation'

import dimensions from 'modules/dimensions'

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: dimensions.UNIT * 4,
    right: dimensions.UNIT * 4,
    zIndex: 1000,
    width: 40,
    height: 40,
  },

  castButton: {
    width: 30,
    height: 30,
    tintColor: 'white',
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

  handleStartCasting = (force) => {
    const { item } = this.props
    const { casting } = this.state

    if (force || casting) {
      Orientation.lockToPortrait()

      console.log(`http://192.168.71.4:3000/watch/${item._id}`)

      GoogleCast.castMedia({
        title: (
          item.type === 'episode'
            ? `${item.show.title}: ${item.number}. ${item.title}`
            : item.title
        ),
        subtitle: item.synopsis,
        mediaUrl: `http://192.168.71.4:3000/watch/${item._id}`,
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
