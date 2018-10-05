import Popcorn, { Constants } from 'popcorn-sdk'

import * as ItemConstants from './ItemConstants'
import * as HomeSelectors from '../Home/HomeSelectors'

export function hasItem(itemId, mode, state) {
  return HomeSelectors.getModes(state)[mode].items.find(item => item.id === itemId)
}

export function fetchedItem(item) {
  return {
    type   : ItemConstants.FETCHED_ITEM,
    payload: item,
  }
}

export function partlyFetchedItem(item) {
  return {
    type   : ItemConstants.PARTLY_FETCH_ITEM,
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
  return (dispatch, getState) => new Promise((resolve) => {
    dispatch({
      type: ItemConstants.FETCH_ITEM,
    })

    const item = hasItem(itemId, type, getState())

    if (type === Constants.TYPE_MOVIE) {
      if (item) {
        resolve(dispatch(fetchedItem(item)))

      } else {
        resolve(Popcorn.getMovie(itemId).then(movie => dispatch(fetchedItem(movie))))
      }

    } else if (type === Constants.TYPE_SHOW) {
      if (item) {
        dispatch(partlyFetchedItem(item))
      }

      return Popcorn.getShowBasic(itemId).then((basicShow) => {
        dispatch(partlyFetchedItem(basicShow))

        return resolve(Popcorn.getShowMeta(basicShow).then(show => dispatch(fetchedItem(show))))
      })
    }

    return null
  })
}
