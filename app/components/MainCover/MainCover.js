import React from 'react'
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'

import CoverGradient from '../CoverGradient'

const styles = StyleSheet.create({

  container: {
    height        : 600,
    width         : '100%',
    alignSelf     : 'stretch',
    position      : 'relative',
    display       : 'flex',
    justifyContent: 'flex-end',
    alignItems    : 'center',
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

})

export const MainCover = ({ loading, item, onPress, children }) => {
  if (loading || !item) {
    return null
  }

  return (
    <TouchableHighlight onPress={() => onPress(item)}>
      <View style={styles.container}>

        <Image
          style={styles.image}
          source={{ uri: item.images.poster.high }}
        />

        <CoverGradient />

        {children}

      </View>
    </TouchableHighlight>
  )
}

export default MainCover
