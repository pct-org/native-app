import { combineReducers } from 'redux'

import ItemReducer from 'mobile/screens/Item/ItemReducer'
import * as ItemConstants from 'mobile/screens/Item'

export default combineReducers({
  [ItemConstants.REDUCER_NAME]: ItemReducer,
})
