import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'

import Disclaimer from 'components/Disclaimer'
import CheckForUpdates from 'components/CheckForUpdates'

import store from '../store'
import Screens from '../screens'

import FocusManager from './modules/FocusManager'

export default () => (
  <FocusManager>
    <Provider store={store}>
      <Disclaimer>
        <Screens />
      </Disclaimer>
    </Provider>
  </FocusManager>
)
