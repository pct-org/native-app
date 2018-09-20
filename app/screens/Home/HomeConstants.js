export const REDUCER_NAME = 'home'

export const MODE_MOVIES = 'movies'
export const MODE_SHOWS = 'shows'
export const MODE_SEARCH = 'search'
export const MODE_BOOKMARKS = 'bookmarks'

export const INITIAL_STATE = {
  isLoading  : false,
  hasInternet: true,
  modes      : {
    bookmarks: { page: 1, items: [], filters: {} },
    movies   : { page: 1, items: [], filters: { limit: 50, sort: 'trending' } },
    shows    : { page: 1, items: [], filters: { limit: 50, sort: 'trending' } },
    search   : { page: 1, items: [], filters: {} },
  },
}

export const FETCH_ITEMS = `${REDUCER_NAME}.fetch.items`
export const FETCHED_ITEMS = `${REDUCER_NAME}.fetched.items`
export const CLEAR_ITEMS = `${REDUCER_NAME}.clear.items`
export const ERROR_NO_CON = `${REDUCER_NAME}.error.no.internet`
