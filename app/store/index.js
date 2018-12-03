import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = [thunk]

if (__DEV__) {
  middleware.push(createLogger({
    options: {
      collapsed: true,
      diff     : true,
    },
  }))
}

export default createStore(reducers, {}, applyMiddleware(...middleware))
