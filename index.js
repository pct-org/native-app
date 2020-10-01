import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'

enableScreens()

LogBox.ignoreLogs([
  'Debugger and device times',
  'Cache data may be lost when replacing'
])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
