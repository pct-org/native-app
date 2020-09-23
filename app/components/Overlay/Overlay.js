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

  medium: {
    backgroundColor: 'black',
    opacity: 0.40,
  },

  dark: {
    backgroundColor: 'black',
    opacity: 0.70,
  },

})

export const Overlay = ({ style, variant, withAnimation }) => (
  <Animatable.View
    animation={
      withAnimation
        ? 'fadeIn'
        : null
    }
    pointerEvents={'box-none'}
    style={styles.root}
    useNativeDriver>
    <View style={[styles.root, styles[variant], style]} />
  </Animatable.View>
)

Overlay.propTypes = {
  variant: PropTypes.oneOf([
    'medium',
    'default',
    'dark',
  ]),
  withAnimation: PropTypes.bool,
  style: PropTypes.object,
}

Overlay.defaultProps = {
  variant: 'default',
  style: {},
  withAnimation: false,
}

export default Overlay
