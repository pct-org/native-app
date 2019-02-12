import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import Device from 'modules/DeviceDetection'

import posterHolderImage from 'images/posterholder.png'

import BaseButton from '../BaseButton'

const { width, height } = Dimensions.get('window')

const smallHeight = height / 4
const smallWidth = (width - 40) / 3.1
const mediumHeight = height / 3.3
const mediumWidth = (width - 40) / 3.5

const rootWidth = (width - (Device.isTablet ? 40 : 32)) / (Device.isTablet ? 4 : 3)

const styles = StyleSheet.create({

  root: {
    height     : (rootWidth * 1.5),
    width      : rootWidth,
    marginLeft : 4,
    marginRight: 4,
    alignSelf  : 'stretch',
    position   : 'relative',
  },

  default: {},

  small: {
    height: smallHeight,
    width : smallWidth,
  },

  // For now is this only correct for Tablet
  medium: {
    height: mediumHeight,
    width : mediumWidth,
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

export default class Card extends React.PureComponent {

  static propTypes = {
    item   : PropTypes.object,
    empty  : PropTypes.bool,
    variant: PropTypes.oneOf([
      'default',
      'medium',
      'small',
    ]),
  }

  static defaultProps = {
    item   : null,
    empty  : false,
    variant: 'default',
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

  getImage = () => {
    const { item, empty } = this.props
    const { showPlaceholder } = this.state

    if (showPlaceholder || empty) {
      return posterHolderImage
    }

    return { uri: item.images.poster.thumb }
  }

  render() {
    const { item, variant, empty, ...rest } = this.props

    return (
      <BaseButton
        // onLongPress={() => console.warn(item.title)}
        // onPress={() => this.openItem(item)}
        {...rest}>
        <View style={[styles.root, styles[variant]]}>
          <Image
            style={styles.image}
            defaultSource={posterHolderImage}
            onError={this.handleImageError}
            source={this.getImage()}
          />

          {item && item.watched && item.watched.complete && (
            <View style={styles.overlay} />
          )}

        </View>
      </BaseButton>
    )
  }
}
