import React from 'react'
import { View } from 'react-native'

export const TouchableNativeFeedback = class extends React.Component {

  static Ripple = jest.fn((color, borderless) => ({
    type: 'Ripple',
    color,
    borderless
  }))

  render() {
    return <View />
  }
}

export default {
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  State: {},
  Directions: {},
}
