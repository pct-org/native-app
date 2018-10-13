import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

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

export function getItem(type, itemId) {
  return (dispatch, getState) => new Promise(async(resolve) => {
    dispatch({
      type: ItemConstants.FETCH_ITEM,
    })

    const item = hasItem(itemId, type, getState())

    if (type === Constants.TYPE_MOVIE) {
      if (item) {
        resolve(dispatch(fetchedItem(
          await Popcorn.bookmarks.checkMovie(item),
        )))

      } else {
        resolve(Popcorn.getMovie(itemId).then(movie => dispatch(fetchedItem(movie))))
      }

    } else if (type === Constants.TYPE_SHOW) {
      if (item) {
        resolve(dispatch(partlyFetchedItem(
          await Popcorn.bookmarks.checkMovie(item),
        )))
      }

      return Popcorn.getShowBasic(itemId).then((basicShow) => {
        dispatch(partlyFetchedItem(basicShow))

        Popcorn.getShowMeta(basicShow).then(show => dispatch(fetchedItem(show)))
      })
    }

    return null
  })
}

export const addToBookmarks = (item) => (dispatch) => {
  Popcorn.bookmarks.addItem(item)

  dispatch({
    type   : ItemConstants.ADD_TO_BOOKMARKS,
    payload: item,
  })
}

export const removeFromBookmarks = (item) => (dispatch) => {
  Popcorn.bookmarks.removeItem(item)

  dispatch({
    type   : ItemConstants.REMOVE_FROM_BOOKMARKS,
    payload: item,
  })
}
