import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/Home'
import ItemScreen from './screens/Item'
import PlayerScreen from './screens/Player'

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },

  Item: {
    screen: ItemScreen,
  },

  Player: {
    screen: PlayerScreen,
  },
}, {
  headerMode: 'none',
})
