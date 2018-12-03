import * as ItemConstants from './ItemConstants'

export default (state = ItemConstants.INITIAL_STATE, action) => {
  switch (action.type) {

    case ItemConstants.FETCH_ITEM:
      return {
        ...state,
        isLoading: true,
        item     : null,
      }

    case ItemConstants.PARTLY_FETCH_ITEM:
      return {
        ...state,
        item: action.payload,
      }

    case ItemConstants.FETCHED_ITEM:
      return {
        ...state,
        isLoading: false,
        item     : action.payload,
      }

    case ItemConstants.ADD_TO_BOOKMARKS:
      return {
        ...state,
        item: {
          ...state.item,
          bookmarked: true,
        },
      }

    case ItemConstants.REMOVE_FROM_BOOKMARKS:
      return {
        ...state,
        item: {
          ...state.item,
          bookmarked: false,
        },
      }

    case ItemConstants.MARK_MOVIE_WATCHED:
      return {
        ...state,
        item: {
          ...state.item,
          watched: {
            complete: true,
          },
        },
      }

    case ItemConstants.MARK_MOVIE_UNWATCHED:
      return {
        ...state,
        item: {
          ...state.item,
          watched: {
            complete: false,
          },
        },
      }

    default:
      return state

  }
}
