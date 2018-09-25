import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'

import posterHolder from 'images/posterholder.png'

const styles = StyleSheet.create({

  root: {
    height     : 190,
    width      : 120,
    marginLeft : 10,
    marginRight: 10,
    alignSelf  : 'stretch',
    position   : 'relative',
  },

  image: {
    height: '100%',
    width : '100%',
  },

})

export default class Card extends React.Component {

  static propTypes = {
    item : PropTypes.object,
    empty: PropTypes.bool,
  }

  static defaultProps = {
    empty: false,
  }

  render() {
    const { item, empty, ...rest } = this.props

    return (
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
  }

}
