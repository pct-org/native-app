import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback } from 'react-native'

export const BaseButton = ({ children, component: Component, innerRef, rippleColor, rippleBorderless, ...rest }) => (
  <Component
    useForeground
    ref={innerRef}
    {...rest}>
    {children}
  </Component>
)

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
}

BaseButton.defaultProps = {
  component: TouchableNativeFeedback,
  innerRef: null,
}

export default BaseButton
