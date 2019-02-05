export const REDUCER_NAME = 'home'

export const INITIAL_STATE = {
  isLoading  : true,
  hasInternet: true,
  modes      : {
    bookmark      : { items: [] },
    bookmarkSearch: { items: [] },

    movie      : { page: 1, items: [], filters: { sort: 'trending' } },
    movieSearch: { page: 1, items: [], filters: {} },

    show      : { page: 1, items: [], filters: { sort: 'trending' } },
    showSearch: { page: 1, items: [], filters: {} },

    myEpisodes: { items: [], fetching: false, refreshing: false },
  },
}

export const FETCH_ITEMS = `${REDUCER_NAME}.fetch.items`
export const FETCHED_ITEMS = `${REDUCER_NAME}.fetched.items`
export const FETCH_MY_EPISODES = `${REDUCER_NAME}.fetch.my.episodes`
export const REFRESH_MY_EPISODES = `${REDUCER_NAME}.refresh.my.episodes`
export const FETCHED_MY_EPISODES = `${REDUCER_NAME}.fetched.my.episodes`
export const CLEAR_ITEMS = `${REDUCER_NAME}.clear.items`
export const ERROR_NO_CON = `${REDUCER_NAME}.error.no.internet`
