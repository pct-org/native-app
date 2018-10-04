import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback } from 'react-native'

export const BaseButton = ({ children, rippleColor, ...rest }) => (
  <TouchableNativeFeedback
    useForeground
    // eslint-disable-next-line babel/new-cap
    background={TouchableNativeFeedback.Ripple(rippleColor)}
    {...rest}>
    {children}
  </TouchableNativeFeedback>
)

BaseButton.propTypes = {
  children   : PropTypes.node.isRequired,
  rippleColor: PropTypes.string,
}

BaseButton.defaultProps = {
  rippleColor: 'rgba(0, 0, 0, .3)',
}

export default BaseButton
