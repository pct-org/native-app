import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig'

import ModeScreen from './Mode'

export const AppNavigator = createStackNavigator({

  Main: ({ ...props }) => <ModeScreen mode={'movies'} {...props} />,

}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
