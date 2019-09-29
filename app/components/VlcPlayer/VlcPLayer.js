import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import NativeVlcPlayer from './NativeVlcPlayer'

export class VlcPlayer extends React.Component {

  static propTypes = {
    paused: PropTypes.bool,
  }

  static defaultProps = {
    paused: false,
  }

  render() {
    const { forwardRef, paused, style, ...rest } = this.props

    return (
      <NativeVlcPlayer
        {...rest}
        paused={paused}
        resizeMode={'contain'}
        ref={forwardRef}
        style={StyleSheet.absoluteFill} />
    )
  }

}

export default React.forwardRef((props, ref) => (
  <VlcPlayer {...props} forwardRef={ref} />
))
