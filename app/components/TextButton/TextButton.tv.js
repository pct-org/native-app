import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'

import BaseTextButton from './TextButton'

// TODO:: Wrap onFocus and onBlur and then make it visible?
export const TextButton = ({
  children,
  ...rest
}) => (
  <BaseTextButton
    component={TouchableHighlight}
    {...rest}>
    {children}
  </BaseTextButton>
)

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
}

TextButton.defaultProps = {
  variant: 'button',
  color: 'white',
  emphasis: 'high',
  animatable: {},
  animatableStyle: {},
}

export default TextButton
