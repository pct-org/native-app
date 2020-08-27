import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './Home'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="Home" component={HomeScreen} />

  </Stack.Navigator>
)
