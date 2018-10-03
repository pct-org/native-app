import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Constants } from 'popcorn-sdk'

import i18n from 'modules/i18n'

import HomeScreen from './Home'
import ItemScreen from './Item'
import PlayerScreen from './Player'
import ModeScreen from './Mode'

export default createStackNavigator({
  Main: {
    screen: createBottomTabNavigator({
      Home: {
        screen           : HomeScreen,
        navigationOptions: {
          tabBarLabel: i18n.t('Home'),
          tabBarIcon : ({ focused, tintColor }) => (
            <Icon
              name={'home'}
              color={tintColor}
              size={25}
            />
          ),
        },
      },

      Movies: {
        screen: ({ ...props }) => <ModeScreen mode={Constants.TYPE_MOVIE} {...props} />,

        navigationOptions: {
          tabBarLabel: i18n.t('Movies'),
          tabBarIcon : ({ focused, tintColor }) => (
            <Icon
              name={'movie'}
              color={tintColor}
              size={25}
            />
          ),
        },
      },

      Shows: {
        screen: ({ ...props }) => <ModeScreen mode={Constants.TYPE_SHOW} {...props} />,

        navigationOptions: {
          tabBarLabel: i18n.t('Shows'),
          tabBarIcon : ({ focused, tintColor }) => (
            <Icon
              name={'subscriptions'}
              color={tintColor}
              size={25}
            />
          ),
        },
      },
    }, {
      initialRouteName: 'Home',
      tabBarOptions   : {
        inactiveTintColor: '#acacac',
        activeTintColor  : '#FFF',

        style: {
          backgroundColor: '#202020',
        },
      },
    }),
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
