import Popcorn, { Constants } from 'popcorn-sdk'

import * as ItemConstants from './ItemConstants'
import * as HomeSelectors from '../Home/HomeSelectors'

export function hasItem(itemId, mode, state) {
  const pluralMode = Constants.PLURALS[mode]
  return HomeSelectors.getModes(state)[pluralMode].items.find(item => item.id === itemId)
}

export function fetchItem() {
  return {
    type: ItemConstants.FETCH_ITEM,
  }
}

export function fetchedItem(item) {
  return {
    type   : ItemConstants.FETCHED_ITEM,
    payload: item,
  }
}

export function fetchEpisodeTorrents() {
  return {
    type: ItemConstants.FETCH_EPISODE_TORRENTS,
  }
}

export function fetchedEpisodeTorrents(item) {
  return {
    type   : ItemConstants.FETCHED_EPISODE_TORRENTS,
    payload: item,
  }
}

export function getItem(type, itemId) {
  return (dispatch, getState) => {
    dispatch(fetchItem())

    if (type === Constants.TYPE_MOVIE) {
      const item = hasItem(itemId, type, getState())

      if (item) {
        return dispatch(fetchedItem(item))
      }

      return Popcorn.getMovie(itemId).then(movie => dispatch(fetchedItem(movie)))

    } else if (type === Constants.TYPE_SHOW) {
      return Popcorn.getShow(itemId).then(show => dispatch(fetchedItem(show)))
    }

    return null
  }
}
