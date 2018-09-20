import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Typography from '../Typography'

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

  linearGradient: {
    position: 'absolute',
    top     : 0,
    right   : 0,
    bottom  : 0,
    left    : 0,
  },
})

export default class MainCover extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    const { loading, item, onPress } = this.props

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

          <LinearGradient
            start={{ x: 0, y: 0.95 }}
            end={{ x: 0, y: 1 }}
            colors={['transparent', '#292929']}
            locations={[0, 1]}
            style={styles.linearGradient} />

        </View>

      </TouchableHighlight>
    )
  }

}
