import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createCollapsibleStack } from 'react-navigation-collapsible'

import constants from 'modules/constants'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'
import SettingsScreen from './Settings'
import AppChangelogScreen from './AppChangelog'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name={'Home'} component={HomeScreen} />
    <Stack.Screen name={'Item'} component={ItemScreen} />
    <Stack.Screen name={'Player'} component={PlayerScreen} />
    <Stack.Screen name={'Settings'} component={SettingsScreen} />
    <Stack.Screen name={'AppChangelog'} component={AppChangelogScreen} />

    {createCollapsibleStack(
      <Stack.Screen name={'Movies'}>
        {(props) => (
          <ModeScreen mode={constants.MODE_MOVIES} {...props} />
        )}
      </Stack.Screen>,
      {},
      1,
    )}

    {createCollapsibleStack(
      <Stack.Screen name={'Shows'}>
        {(props) => (
          <ModeScreen mode={constants.MODE_SHOWS} {...props} />
        )}
      </Stack.Screen>,
      {},
      1,
    )}

    {createCollapsibleStack(
      <Stack.Screen name={'MyList'}>
        {(props) => (
          <ModeScreen mode={constants.MODE_BOOKMARKS} {...props} />
        )}
      </Stack.Screen>,
      {},
      1,
    )}
  </Stack.Navigator>
)
