import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import Device from 'modules/DeviceDetection'

import posterHolderImage from 'images/posterholder.png'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import BaseButton from '../BaseButton'
import Overlay from '../Overlay'

const { width } = Dimensions.get('window')

const rootWidth = (width - (Device.isTablet ? 40 : 32)) / (Device.isTablet ? 4 : 3)

const styles = StyleSheet.create({

  root: {
    height      : (rootWidth * 1.5),
    width       : rootWidth,
    alignSelf   : 'stretch',
    position    : 'relative',
    borderRadius: dimensions.BORDER_RADIUS,
    overflow    : 'hidden',
    backgroundColor: colors.BACKGROUND_LIGHTER,
  },

  default: {},

  small: {
    //   height: smallHeight,
//    width : smallWidth,
  },

  // For now is this only correct for Tablet
  medium: {
    height: dimensions.CARD_MEDIUM_HEIGHT,
    width : dimensions.CARD_MEDIUM_WIDTH,
  },

  image: {
    height: '100%',
    width : '100%',
  },

})

// TODO:: When card is empty then animate a gray?

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
            <Overlay />
          )}

        </View>
      </BaseButton>
    )
  }
}
