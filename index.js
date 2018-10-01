import { AppRegistry, YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './app/index'

AppRegistry.registerComponent('popcorn', () => App)
