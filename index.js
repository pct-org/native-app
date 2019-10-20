import { AppRegistry, YellowBox } from 'react-native'
import 'react-native-gesture-handler'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
