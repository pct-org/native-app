import React from 'react'
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CoverGradient from '../CoverGradient'
import Typography from '../Typography'

const styles = StyleSheet.create({

  container: {
    height        : 600,
    width         : '100%',
    alignSelf     : 'stretch',
    position      : 'relative',
    display       : 'flex',
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

})

export const MainCover = ({ item, onPress, children, onLoad }) => {
  if (!item) {
    return null
  }

  return (
    <TouchableHighlight onPress={() => onPress(item)}>
      <View style={styles.container}>

        <Image
          style={styles.image}
          source={{ uri: item.images.poster.high }}
          onLoad={onLoad}
        />

        <CoverGradient />

        {children}

      </View>
    </TouchableHighlight>
  )
}

export default MainCover
