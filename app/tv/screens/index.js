import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './Home'
import PlayerScreen from './Player'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="Player" component={PlayerScreen} />

  </Stack.Navigator>
)
