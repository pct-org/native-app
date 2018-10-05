import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

import colors from 'modules/colors'

import Logo from 'images/logo.png'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top     : 0,
    bottom  : 0,
    right   : 0,
    left    : 0,

    backgroundColor: colors.BACKGROUND,

    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    zIndex        : 100,
  },

  logo: {
    width : 100,
    height: 100,
  },

  loader: {
    marginTop: 8,
  },
})

export default class FullScreenLoading extends React.PureComponent {

  static propTypes = {
    enabled: PropTypes.bool,
  }

  static defaultProps = {
    enabled: true,
  }

  state = {
    hidden: false,
    first : true,
  }

  getAnimation = () => {
    const { enabled } = this.props
    const { first } = this.state

    if (enabled) {
      if (!first) {
        return 'fadeIn'
      }
    } else {
      return 'fadeOut'
    }

    return null
  }

  handleAnimationEnd = () => {
    this.setState({
      hidden: true,
      first : false,
    })
  }

  handleAnimationBegin = () => {
    this.setState({
      hidden: false,
    })
  }

  render() {
    const { enabled } = this.props
    const { hidden } = this.state

    if (hidden && !enabled) {
      return null
    }

    return (
      <Animatable.View
        animation={this.getAnimation()}
        duration={500}
        style={styles.root}
        onAnimationBegin={this.handleAnimationBegin}
        onAnimationEnd={this.handleAnimationEnd}
        useNativeDriver>

        <Image
          style={styles.logo}
          source={Logo} />

        <ActivityIndicator
          size={40}
          style={styles.loader}
          color={'#FFF'} />

      </Animatable.View>
    )
  }
}
