import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

import BaseButton from './BaseButton'

export const BaseButtonTV = (...props) => (
  <BaseButton {...props} />
)

BaseButtonTV.defaultProps = {
  ...BaseButton.defaultProps,
  component: TouchableNativeFeedback,
  rippleColor: 'test',
}

export default BaseButton
