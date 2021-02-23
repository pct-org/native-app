import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'

enableScreens()

LogBox.ignoreLogs([
  'Cache data may be lost when replacing',
  'The updateQuery callback for fetchMore is deprecated'
])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
