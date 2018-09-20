import { combineReducers } from 'redux'

import { HomeReducer, HomeConstants } from '../screens/Home'
import { ItemReducer, ItemConstants } from '../screens/Item'

export default combineReducers({
  [HomeConstants.REDUCER_NAME]: HomeReducer,
  [ItemConstants.REDUCER_NAME]: ItemReducer,
})
