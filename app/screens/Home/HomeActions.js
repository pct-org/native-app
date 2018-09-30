import Popcorn from 'popcorn-sdk'

import * as HomeConstants from './HomeConstants'
import * as HomeSelectors from './HomeSelectors'

export const fetchItems = () => ({
  type: HomeConstants.FETCH_ITEMS,
})

export const fetchedItems = (items, mode) => ({
  type   : HomeConstants.FETCHED_ITEMS,
  payload: {
    items,
    mode,
  },
})

export const clearItems = mode => ({
  type   : HomeConstants.CLEAR_ITEMS,
  payload: mode,
})

export const getItems = (mode, page = 1, givenFilters = {}) => (dispatch, getState) => {
  dispatch(fetchItems())

  const catchNoCon = ({ message }) => {
    if (message === 'Network Error') {
      dispatch({
        type: HomeConstants.ERROR_NO_CON,
      })
    }
  }

  const { filters: defaultFilters } = HomeSelectors.getModes(getState())[mode]

  const filters = {
    ...defaultFilters,
    ...givenFilters,
  }

  switch (mode) {
    case HomeConstants.MODE_MOVIES:
      return Popcorn.getMovies(page, filters).then(movies => dispatch(fetchedItems(movies, mode))).catch(catchNoCon)

    case HomeConstants.MODE_SHOWS:
      return Popcorn.getShows(page, filters).then(shows => dispatch(fetchedItems(shows, mode))).catch(catchNoCon)

    default:
      return null
  }
}
