import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import posterHolder from 'images/posterholder.png'

import BaseButton from '../BaseButton'

const styles = StyleSheet.create({

  root: {
    height     : 190,
    width      : 125,
    marginLeft : 4,
    marginRight: 4,
    alignSelf  : 'stretch',
    position   : 'relative',
  },

  small: {
    height: 180,
    width : 115,
  },

  image: {
    height: '100%',
    width : '100%',
  },

  overlay: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    height  : '100%',
    width   : '100%',
    opacity : 0.8,

    backgroundColor: '#000',
  },

})

export default class Card extends React.Component {

  static propTypes = {
    item : PropTypes.object,
    empty: PropTypes.bool,
  }

  static defaultProps = {
    item : null,
    empty: false,
    small: false,
  }

  constructor(props) {
    super(props)

    const { item, empty } = props

    this.state = {
      showPlaceholder: empty || !item.images.poster.thumb,
    }
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }

  render() {
    const { item, small, empty, ...rest } = this.props
    const { showPlaceholder } = this.state

    return (
      <BaseButton
        // onLongPress={() => console.warn(item.title)}
        // onPress={() => this.openItem(item)}
        {...rest}>
        <View style={[styles.root, small ? styles.small : {}]}>
          <Image
            style={styles.image}
            defaultSource={posterHolder}
            onError={this.handleImageError}
            source={
              !showPlaceholder && !empty
                ? { uri: item.images.poster.thumb }
                : posterHolder
            }
          />

          {item && item.watched && item.watched.complete && (
            <View style={styles.overlay} />
          )}

        </View>
      </BaseButton>
    )
  }
}
