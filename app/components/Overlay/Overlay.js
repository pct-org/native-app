import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.50,
  },

  default: {},

  dark: {
    opacity: 0.70,
  },

})

export const Overlay = ({ style, variant }) => (
  <View style={[styles.root, styles[variant], style]} />
)

Overlay.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'dark',
  ]),
}

Overlay.defaultProps = {
  variant: 'default',
  style: {},
}

export default Overlay
