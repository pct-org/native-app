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
    opacity        : 0.2,
  },

})

export const Overlay = () => (
  <View style={styles.root} />
)

export default Overlay
