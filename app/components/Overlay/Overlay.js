import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  default: {
    backgroundColor: 'black',
    opacity: 0.50,
  },

  dark: {
    backgroundColor: 'black',
    opacity: 0.70,
  },

})

export const Overlay = ({ style, variant }) => (
  <Animatable.View
    animation={'fadeIn'}
    pointerEvents={'box-none'}
    style={styles.root}
    useNativeDriver>
    <View style={[styles.root, styles[variant], style]} />
  </Animatable.View>
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
