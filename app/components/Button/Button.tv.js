import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableHighlight } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import BaseButton from '../BaseButton'

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
  },

  primary: {
    ...defaultPadding,
    backgroundColor: colors.BUTTON_PRIMARY
  },

  active: {

  },

  focused: {
    // backgroundColor: 'pink'
  }
})

export const Button = ({ children, variant, style, onFocus, ...rest }) => {
  const [focus, toggleFocus] = useState(false)

  return (
    <BaseButton
      style={{
        ...styles[variant],
        ...style,
        ...focus ? styles.focused : {}
      }}
      component={TouchableHighlight}
      onFocus={() => {
        if (onFocus) {
          onFocus()
        }
        console.log('button onFocus')
        toggleFocus(true)
      }}
      onBlur={() => {
        console.log('button onBlur')
        toggleFocus(false)
      }}
      fontWeight={'bold'}
      {...rest}>
      {children}
    </BaseButton>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
//  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary']),
}

Button.defaultProps = {
  variant: 'default',
  onFocus: null,
  onBlur: null,
  style: {},
}

export default Button
