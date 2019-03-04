export const REDUCER_NAME = 'item'

export const INITIAL_STATE = {
  fetchingEpisodeTorrents: false,
  isLoading              : false,
  item                   : null,
  playerStatus           : null,
  selectedSeason         : null,
  selectedEpisode        : null,
}

export const FETCH_ITEM = `${REDUCER_NAME}.fetch.item`
export const PARTLY_FETCH_ITEM = `${REDUCER_NAME}.partly.fetch.item`
export const FETCHED_ITEM = `${REDUCER_NAME}.fetched.item`

export const ADD_TO_BOOKMARKS = `${REDUCER_NAME}.add.to.bookmarks`
export const REMOVE_FROM_BOOKMARKS = `${REDUCER_NAME}.remove.from.bookmarks`

export const MARK_MOVIE_WATCHED = `${REDUCER_NAME}.mark.watched.movie`
export const MARK_MOVIE_UNWATCHED = `${REDUCER_NAME}.mark.unwatched.movie`

export const FETCHED_BETTER_FOR_EPISODE = `${REDUCER_NAME}.fetched.better.for.episode`
export const FETCHED_BETTER_FOR_MOVIE = `${REDUCER_NAME}.fetched.better.for.movie`
