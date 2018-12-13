import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import Bookmarks from 'modules/db/Bookmarks'

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
    case Constants.TYPE_MOVIE:
      return Popcorn.getMovies(page, filters).then(movies => dispatch(fetchedItems(movies, mode))).catch(catchNoCon)

    case 'movieSearch':
      // Clear the items
      dispatch(clearItems(mode))

      return Popcorn.getMovies(page, filters).then(movies => dispatch(fetchedItems(movies, mode))).catch(catchNoCon)

    case Constants.TYPE_SHOW:
      return Popcorn.getShows(page, filters).then(shows => dispatch(fetchedItems(shows, mode))).catch(catchNoCon)

    case 'showSearch':
      // Clear the items
      dispatch(clearItems(mode))

      return Popcorn.getShows(page, filters).then(shows => dispatch(fetchedItems(shows, mode))).catch(catchNoCon)

    case Constants.TYPE_BOOKMARK:
      const existingBookmarks = getState().home.modes.bookmark.items

      return Bookmarks.getAll().then((bookmarks) => {
        Popcorn.checkAdapters('checkMovies')(bookmarks).then(bookmarks => {

          dispatch(
            fetchedItems(
              // If we already have bookmarks then don't add the existing ones again
              existingBookmarks.length > 0 ? [] : bookmarks,
              mode,
            ),
          )
        })
      })

    case 'bookmarkSearch':
      return Bookmarks.getAll().then(bookmarks => dispatch(
        fetchedItems(
          bookmarks.filter(bookmark => bookmark.title.toLowerCase().indexOf(filters.keywords.toLowerCase()) > -1),
          mode,
        ),
      ))

    default:
      return null
  }
}
