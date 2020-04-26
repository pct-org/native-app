import 'react-native-gesture-handler'
import { AppRegistry, YellowBox } from 'react-native'
import { enableScreens } from 'react-native-screens'

enableScreens()

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
