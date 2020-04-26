import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

export const BaseButton = ({ children, component: Component, innerRef, rippleColor, ...rest }) => (
  <Component
    useForeground
    ref={innerRef}
    // eslint-disable-next-line babel/new-cap
    rippleColor={rippleColor}
    // background={
    //   rippleColor !== null
    //     ? TouchableNativeFeedback.Ripple(rippleColor, true)
    //     : null
    // }
    {...rest}>
    {children}
  </Component>
)

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  rippleColor: PropTypes.oneOf([null, 'rgba(0, 0, 0, .3)', 'transparent']),
}

BaseButton.defaultProps = {
  rippleColor: 'rgba(0, 0, 0, .3)',
  component: TouchableNativeFeedback,
  innerRef: null,
}

export default BaseButton
