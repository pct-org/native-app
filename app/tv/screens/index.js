import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig/fade'

import ModeScreen from './Mode'
import ItemScreen from './Item'

export const AppNavigator = createStackNavigator({

  Main: ({ ...props }) => <ModeScreen mode={'movies'} {...props} />,

  Item: ItemScreen,

}, {
  headerMode: 'none',

  transitionConfig,
})

export default createAppContainer(AppNavigator)
