import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'

import posterHolder from 'images/posterholder.png'

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
  <TouchableHighlight
    activeOpacity={0.8}
    // onLongPress={() => console.warn(item.title)}
    // onPress={() => this.openItem(item)}
    style={styles.root}
    {...rest}>
    <View style={{ width: '100%', height: '100%' }}>
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
  </TouchableHighlight>
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
