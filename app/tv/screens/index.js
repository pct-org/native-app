import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig'

import HomeTVScreen from './HomeTV'

export const AppNavigator = createStackNavigator({

  Main: HomeTVScreen,

}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
