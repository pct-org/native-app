import { AppRegistry, YellowBox } from 'react-native'
import { enableScreens } from 'react-native-screens'
import 'react-native-gesture-handler'

enableScreens()

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
