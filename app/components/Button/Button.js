import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import TextButton from '../TextButton'

const defaultPadding = {
  paddingLeft: dimensions.UNIT * 2,
  paddingRight: dimensions.UNIT * 2,
  paddingTop: dimensions.UNIT,
  paddingBottom: dimensions.UNIT,
  borderRadius: dimensions.BORDER_RADIUS,
}

export const styles = StyleSheet.create({

  default: {
    ...defaultPadding,

    // backgroundColor: colors.BUTTON_DEFAULT,
  },

  primary: {
    ...defaultPadding,

    backgroundColor: colors.BUTTON_PRIMARY,
  },

})

export const Button = ({ children, variant, style, ...rest }) => (
  <TextButton
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
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary']),
}

Button.defaultProps = {
  variant: 'default',
  style: {},
}

export default Button
