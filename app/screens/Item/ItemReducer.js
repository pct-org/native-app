// @flow
import * as ItemConstants from './ItemConstants'

export default (state = ItemConstants.INITIAL_STATE, action) => {
  switch (action.type) {

    case ItemConstants.FETCH_ITEM:
      return {
        ...state,
        isLoading: true,
      }

    case ItemConstants.FETCHED_ITEM:
      return {
        ...state,
        isLoading: false,
        item     : action.payload,
      }

    case ItemConstants.FETCH_EPISODE_TORRENTS:
      return {
        ...state,
        fetchingEpisodeTorrents: true,
      }

    case ItemConstants.FETCHED_EPISODE_TORRENTS:
      return {
        ...state,
        fetchingEpisodeTorrents: false,
        item                   : action.payload,
      }

    case ItemConstants.SELECT_SEASON_EPISODE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state

  }
}
