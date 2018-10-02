import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = [thunk]

if (__DEV__) {
  middleware.push(logger)
}

export default createStore(reducers, {}, applyMiddleware(...middleware))
