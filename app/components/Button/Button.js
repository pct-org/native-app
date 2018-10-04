import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import { material } from 'react-native-typography'

import BaseButton from '../BaseButton'

export const styles = StyleSheet.create({

  base: {
    ...material.buttonWhiteObject,

    paddingLeft  : 16,
    paddingRight : 16,
    paddingTop   : 8,
    paddingBottom: 8,
    borderRadius : 4,
  },

  primary: {
    backgroundColor: '#202020',
  },

})

export const Button = ({ children, onPress, variant }) => (
  <BaseButton onPress={onPress}>

    <Text style={[styles.base, styles[variant]]}>
      {children.toUpperCase()}
    </Text>

  </BaseButton>
)

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary']),
}

Button.defaultProps = {
  variant: 'default',
}

export default Button
