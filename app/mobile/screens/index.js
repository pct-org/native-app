import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import transitionConfig from 'modules/transitionConfig'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

export const AppNavigator = createStackNavigator({

  Main: HomeScreen,

  Item: ItemScreen,

  Player: PlayerScreen,

  Movies: ({ ...props }) => <ModeScreen mode={'movies'} {...props} />,

  Shows: ({ ...props }) => <ModeScreen mode={'shows'} {...props} />,

  MyList: ({ ...props }) => <ModeScreen mode={'bookmarks'} {...props} />,

}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
