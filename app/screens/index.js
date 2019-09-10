/* eslint react/prop-types: 0 */

import React from 'react'
import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Constants } from 'popcorn-sdk'

import transitionConfig from '../modules/transitionConfig'
import useCorrect from '../modules/useCorrect'

import HomeScreen from './Home'
import HomeTVScreen from '../tv/screens/HomeTV'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

export const AppNavigator = createStackNavigator({

  Main: useCorrect(HomeScreen, null, HomeTVScreen),

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
