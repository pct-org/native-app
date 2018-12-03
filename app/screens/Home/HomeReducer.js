import * as HomeConstants from './HomeConstants'
import * as ItemConstants from '../Item/ItemConstants'

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

    case ItemConstants.ADD_TO_BOOKMARKS:
      return {
        ...state,
        modes: {
          ...state.modes,
          bookmark: {
            ...state.modes.bookmark,
            items: [
              ...state.modes.bookmark.items,
              action.payload,
            ],
          },
        },
      }

    case ItemConstants.REMOVE_FROM_BOOKMARKS:
      return {
        ...state,
        modes: {
          ...state.modes,
          bookmark: {
            ...state.modes.bookmark,
            items: state.modes.bookmark.items.filter(bookmark => bookmark.id !== action.payload.id),
          },
        },
      }

    case ItemConstants.MARK_MOVIE_WATCHED:
      return {
        ...state,
        modes: {
          ...state.modes,
          movie: {
            ...state.modes.movie,
            items: state.modes.movie.items.map(movie => {
              if (movie.id !== action.payload.id) {
                return movie
              }

              return {
                ...movie,
                watched: {
                  complete: true,
                },
              }
            }),
          },
        },
      }

      case ItemConstants.MARK_MOVIE_UNWATCHED:
      return {
        ...state,
        modes: {
          ...state.modes,
          movie: {
            ...state.modes.movie,
            items: state.modes.movie.items.map(movie => {
              if (movie.id !== action.payload.id) {
                return movie
              }

              return {
                ...movie,
                watched: {
                  complete: false,
                },
              }
            }),
          },
        },
      }

    default:
      return state
  }
}
