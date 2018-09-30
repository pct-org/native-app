import Popcorn, { Constants } from 'popcorn-sdk'

import * as ItemConstants from './ItemConstants'
import * as HomeSelectors from '../Home/HomeSelectors'

export function hasItem(itemId, mode, state) {
  const pluralMode = Constants.PLURALS[mode]
  return HomeSelectors.getModes(state)[pluralMode].items.find(item => item.id === itemId)
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
    dispatch({
      type: ItemConstants.FETCH_ITEM,
    })

    const item = hasItem(itemId, type, getState())

    if (type === Constants.TYPE_MOVIE) {
      if (item) {
        return Promise.resolve(dispatch(fetchedItem(item)))
      }

      return Popcorn.getMovie(itemId).then(movie => dispatch(fetchedItem(movie)))

    } else if (type === Constants.TYPE_SHOW) {
      if (item) {
        dispatch({
          type   : ItemConstants.PARTLY_FETCH_ITEM,
          payload: item,
        })
      }

      return Popcorn.getShow(itemId).then(show => dispatch(fetchedItem(show)))
    }

    return null
  }
}
