/* eslint react/prop-types: 0 */

import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'popcorn-sdk'

import transitionConfig from '../modules/transitionConfig'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

// https://github.com/oblador/react-native-animatable/blob/d9cbb610a0ba530cad66ea8d346505271b1daed8/definitions/sliding-entrances.js

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

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
