import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import posterHolder from 'images/posterholder.png'

import BaseButton from '../BaseButton'

const styles = StyleSheet.create({

  root: {
    height     : 190,
    width      : 120,
    marginLeft : 8,
    marginRight: 8,
    alignSelf  : 'stretch',
    position   : 'relative',
  },

  image: {
    height: '100%',
    width : '100%',
  },

})

export const Card = ({ item, empty, ...rest }) => (
  <BaseButton
    // onLongPress={() => console.warn(item.title)}
    // onPress={() => this.openItem(item)}
    >
    <View style={styles.root}>
      <Image
        style={styles.image}
        defaultSource={posterHolder}
        source={
          !empty
            ? { uri: item.images.poster.thumb }
            : posterHolder
        }
      />
    </View>
  </BaseButton>
)

Card.propTypes = {
  item : PropTypes.object,
  empty: PropTypes.bool,
}

Card.defaultProps = {
  item : null,
  empty: false,
}

export default Card
