import { TouchableNativeFeedback } from 'react-native'

import BaseButton from './BaseButton'

BaseButton.defaultProps = {
  ...BaseButton.defaultProps,
  component: TouchableNativeFeedback,
  rippleColor: null,
}

export default BaseButton
