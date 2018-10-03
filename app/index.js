import React from 'react'
import { Provider } from 'react-redux'

import CheckForUpdates from 'components/CheckForUpdates'

import store from './store'
import Screens from './screens'

export default () => (
  <Provider store={store}>
    <React.Fragment>
      <Screens />

      <CheckForUpdates />
    </React.Fragment>
  </Provider>
)
