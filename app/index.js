import React from 'react'
import { Provider } from 'react-redux'

import Disclaimer from 'components/Disclaimer'
import CheckForUpdates from 'components/CheckForUpdates'

import store from './store'
import Screens from './screens'

export default () => (
  <Provider store={store}>
    <Disclaimer>
      <Screens />

      <CheckForUpdates />
    </Disclaimer>
  </Provider>
)
