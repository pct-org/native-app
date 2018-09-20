// @flow
import * as HomeConstants from './HomeConstants'

export default (state = HomeConstants.INITIAL_STATE, action) => {
  switch (action.type) {

    case HomeConstants.FETCH_ITEMS:
      return {
        ...state,
        isLoading  : true,
        hasInternet: true,
      }

    case HomeConstants.ERROR_NO_CON:
      return {
        ...state,
        isLoading  : false,
        hasInternet: false,
      }

    case HomeConstants.FETCHED_ITEMS:
      return {
        ...state,
        isLoading: false,
        modes    : {
          ...state.modes,
          [action.payload.mode]: {
            page : state.modes[action.payload.mode].page + 1,
            limit: state.modes[action.payload.mode].limit,
            items: [...state.modes[action.payload.mode].items, ...action.payload.items],
          },
        },
      }

    case HomeConstants.CLEAR_ITEMS:
      return {
        ...state,
        modes: {
          ...state.modes,
          [action.payload]: HomeConstants.INITIAL_STATE.modes[action.payload],
        },
      }

    default:
      return state
  }
}
