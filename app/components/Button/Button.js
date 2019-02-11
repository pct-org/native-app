import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import colors from 'modules/colors'

import TextButton from '../TextButton'

const defaultPadding = {
  paddingLeft  : 16,
  paddingRight : 16,
  paddingTop   : 8,
  paddingBottom: 8,
  borderRadius : 4,
}

export const styles = StyleSheet.create({

  default: {
    ...defaultPadding,

    backgroundColor: colors.BUTTON_DEFAULT,
  },

  primary: {
    ...defaultPadding,

    backgroundColor: colors.BUTTON_PRIMARY,
  },

})

export const Button = ({ children, onPress, variant, style, ...rest }) => (
  <TextButton
    onPress={onPress}
    style={{
      ...styles[variant],
      ...style,
    }}
    fontWeight={'bold'}
    {...rest}>
    {children}
  </TextButton>
)

Button.propTypes = {
  onPress : PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  variant : PropTypes.oneOf(['default', 'primary']),
}

Button.defaultProps = {
  variant: 'default',
  style  : {},
}

export default Button
