export const REDUCER_NAME = 'item'

export const INITIAL_STATE = {
  fetchingBetter: false,

  isLoading: false,
  item     : null,
}

export const FETCH_ITEM = `${REDUCER_NAME}.fetch.item`
export const PARTLY_FETCH_ITEM = `${REDUCER_NAME}.partly.fetch.item`
export const FETCHED_ITEM = `${REDUCER_NAME}.fetched.item`
export const CLEAR_ITEM = `${REDUCER_NAME}.clear.item`

export const ADD_TO_BOOKMARKS = `${REDUCER_NAME}.add.to.bookmarks`
export const REMOVE_FROM_BOOKMARKS = `${REDUCER_NAME}.remove.from.bookmarks`

export const MARK_MOVIE_WATCHED = `${REDUCER_NAME}.mark.watched.movie`
export const MARK_MOVIE_UNWATCHED = `${REDUCER_NAME}.mark.unwatched.movie`
