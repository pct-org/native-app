/* eslint react/prop-types: 0 */

import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'popcorn-sdk'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

export const AppNavigator = createStackNavigator({
  Main: {
    screen: HomeScreen,
  },

  Item: {
    screen: ItemScreen,
  },

  Player: {
    screen: PlayerScreen,
  },

  Movies: {
    screen: ({ ...props }) => <ModeScreen mode={Constants.TYPE_MOVIE} {...props} />,
  },

  Shows: {
    screen: ({ ...props }) => <ModeScreen mode={Constants.TYPE_SHOW} {...props} />,
  },

}, {
  headerMode: 'none',
  mode: 'modal'
})


export default createAppContainer(AppNavigator)
