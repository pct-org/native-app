import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import NativeVlcPlayer from 'react-native-vlc-player/src/NativeVlcPlayer'

class VlcPlayer extends Component {
  static propTypes = {
    paused: PropTypes.bool,
  }

  static defaultProps = {
    paused: false,
  }

  state = {
    hidden: false,
    overlay: {
      opacity: 0,
      backgroundColor: 'transparent',
    },
  }

  render() {
    const { forwardRef, paused, style, ...rest } = this.props

    const props = JSON.parse(JSON.stringify(rest))

    return (

      <NativeVlcPlayer
        {...props}
        paused={paused}
        ref={forwardRef}
        style={StyleSheet.absoluteFill} />

    )
  }

}

export default React.forwardRef((props, ref) => (
  <VlcPlayer {...props} forwardRef={ref} />
))
