import React from 'react'
import { StyleSheet, View } from 'react-native'

export const styles = StyleSheet.create({

  root: {
    position       : 'absolute',
    top            : 0,
    right          : 0,
    bottom         : 0,
    left           : 0,
    backgroundColor: 'black',
    opacity        : 0.32,
  },

})

export const Overlay = ({ style }) => (
  <View style={[styles.root, style]} />
)

Overlay.defaultProps = {
  style: {},
}

export default Overlay
