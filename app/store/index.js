import { createStore, applyMiddleware } from 'redux-clazz'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middleware = applyMiddleware(
  logger,
  thunk,
)

export default createStore(reducers, {}, middleware)
