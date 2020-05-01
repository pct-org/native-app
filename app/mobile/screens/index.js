import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createCollapsibleStack } from 'react-navigation-collapsible'

import colors from 'modules/colors'

import Typography from 'components/Typography'
import Icon from 'components/Icon'

import HomeScreen from './Home'
import DownloadsScreen from './Downloads'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'home'

        switch (route.name) {
          case 'Downloads':
            iconName = 'cloud-download'
        }

        return (
          <Icon
            name={iconName}
            size={size}
            color={
              focused
                ? 'primary'
                : 'surface_medium'
            } />
        )
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.ICON.PRIMARY,
      inactiveTintColor: colors.ON_SURFACE.MEDIUM,

      labelStyle: Typography.getTextStyle({
        variant: 'caption',
        color: 'inherit',
      }),

      tabStyle: {
        backgroundColor: colors.BACKGROUND_TABS,
      },

      style: {
        borderTopColor: 'transparent',
        borderTopWidth: 0
      }
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Downloads" component={DownloadsScreen} />
  </Tab.Navigator>
)

export default () => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="Home" component={Tabs} />
    <Stack.Screen name="Item" component={ItemScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} />

    {createCollapsibleStack(
      <Stack.Screen name="Movies">
        {(props) => <ModeScreen mode={'movies'} {...props} />}
      </Stack.Screen>,
      {},
      1,
    )}

    {createCollapsibleStack(
      <Stack.Screen name="Shows">
        {(props) => <ModeScreen mode={'shows'} {...props} />}
      </Stack.Screen>,
      {},
      1,
    )}

    {createCollapsibleStack(
      <Stack.Screen name="MyList">
        {(props) => <ModeScreen mode={'bookmarks'} {...props} />}
      </Stack.Screen>,
      {},
      1,
    )}
  </Stack.Navigator>
)
