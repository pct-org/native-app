import React from 'react'
import PropTypes from 'prop-types'
import { Image as RnImage, StyleSheet } from 'react-native'

import posterHolderImage from 'images/posterholder.png'

const styles = StyleSheet.create({

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  placeholderImage: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'center',
  },

})

export default class Image extends React.PureComponent {

  static getDerivedStateFromProps(props) {
    const { images, type, size, empty } = props

    return {
      showPlaceholder: empty || !images || !images[type] || !images[type][size],
    }
  }

  static propTypes = {
    images: PropTypes.object.isRequired,
    type  : PropTypes.oneOf([
      'poster',
      'fanart',
    ]),
    size  : PropTypes.string,

    style: PropTypes.object,
  }

  static defaultProps = {
    type : 'poster',
    size : 'thumb',
    style: null,
  }

  state = {
    showPlaceholder: false,
  }

  getImage = () => {
    const { images, type, size, empty } = this.props
    const { showPlaceholder } = this.state

    if (showPlaceholder || empty) {
      return posterHolderImage
    }

    return { uri: images[type][size] }
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }


  render() {
    const { images, style, ...props } = this.props
    const { showPlaceholder } = this.state

    return (
      <RnImage
        style={[
          showPlaceholder
            ? styles.placeholderImage
            : styles.image,
          style,
        ]}
        defaultSource={posterHolderImage}
        source={this.getImage()}
        {...props}
      />
    )
  }

}
