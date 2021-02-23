import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { TouchableNativeFeedback as RNTouchableNativeFeedback } from 'react-native'

export const BaseButton = ({ children, component: Component, innerRef, rippleColor, rippleBorderless, ...rest }) => (
  <Component
    useForeground
    ref={innerRef}
    background={
      rippleColor !== null
        // eslint-disable-next-line babel/new-cap
        ? RNTouchableNativeFeedback.Ripple(rippleColor, rippleBorderless)
        : null
    }
    {...rest}>
    {children}
  </Component>
)

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  rippleColor: PropTypes.oneOf([null, 'rgba(0, 0, 0, .3)', 'transparent']),
  rippleBorderless: PropTypes.bool,
}

BaseButton.defaultProps = {
  rippleColor: 'rgba(0, 0, 0, .3)',
  rippleBorderless: true,
  component: TouchableNativeFeedback,
  innerRef: null,
}

export default BaseButton
