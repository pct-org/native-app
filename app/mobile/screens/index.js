import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig'

import HomeScreen from './Home'

export const AppNavigator = createStackNavigator({

  Main: HomeScreen,


}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
