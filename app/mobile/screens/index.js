import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'

export const AppNavigator = createStackNavigator({

  Main: HomeScreen,

  Item: ItemScreen,

  Player: PlayerScreen,

}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
