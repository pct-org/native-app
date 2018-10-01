import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Screens from './screens'

export default () => (
  <Provider store={store}>
    <Screens />
  </Provider>
)
