/* eslint react/prop-types: 0 */

import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'popcorn-sdk'

import transitionConfig from '../modules/transitionConfig'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

export const AppNavigator = createStackNavigator({

  Main: HomeScreen,

  Item: ItemScreen,

  Player: PlayerScreen,

  Movies: ({ ...props }) => <ModeScreen mode={Constants.TYPE_MOVIE} {...props} />,

  Shows: ({ ...props }) => <ModeScreen mode={Constants.TYPE_SHOW} {...props} />,

  Bookmarks: ({ ...props }) => <ModeScreen mode={Constants.TYPE_BOOKMARK} {...props} />,

}, {
  headerMode: 'none',

  transitionConfig: transitionConfig,
})

export default createAppContainer(AppNavigator)
