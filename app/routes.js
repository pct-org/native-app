import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/Home'
import ItemScreen from './screens/Item'

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Item: {
    screen: ItemScreen,
  },
}, {
  headerMode: 'none',
})
