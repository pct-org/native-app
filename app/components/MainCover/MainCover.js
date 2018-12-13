import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View } from 'react-native'

import CoverGradient from '../CoverGradient'
import BaseButton from '../BaseButton'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({

  container: {
    height   : height * 0.8,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
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
    <BaseButton onPress={() => onPress(item)}>
      <View style={styles.container}>

        <Image
          style={styles.image}
          source={{ uri: item.images.poster.high }}
          onLoad={onLoad}
          onError={onLoad}
        />

        <CoverGradient />

        {children}

      </View>
    </BaseButton>
  )
}

MainCover.propTypes = {
  item    : PropTypes.object,
  onPress : PropTypes.func.isRequired,
  onLoad  : PropTypes.func.isRequired,
  children: PropTypes.node,
}

MainCover.defaultProps = {
  item    : null,
  children: null,
}

export default MainCover
