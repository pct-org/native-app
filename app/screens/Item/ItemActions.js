import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import Bookmarks from 'modules/db/Bookmarks'
import Watched from 'modules/db/Watched'

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
          await Popcorn.checkAdapters('checkMovie')(item),
        )))

      } else {
        resolve(Popcorn.getMovie(itemId).then(movie => dispatch(fetchedItem(movie))))
      }

    } else if (type === Constants.TYPE_SHOW) {
      if (item) {
        resolve(dispatch(partlyFetchedItem(
          await Popcorn.checkAdapters('checkShow')(item),
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
  Bookmarks.addItem(item)

  dispatch({
    type   : ItemConstants.ADD_TO_BOOKMARKS,
    payload: item,
  })
}

export const removeFromBookmarks = (item) => (dispatch) => {
  Bookmarks.removeItem(item)

  dispatch({
    type   : ItemConstants.REMOVE_FROM_BOOKMARKS,
    payload: item,
  })
}

export const markWatched = (item) => (dispatch) => {
  Watched.markMovie(item)

  dispatch({
    type   : ItemConstants.MARK_MOVIE_WATCHED,
    payload: item,
  })
}

export const markUnwatched = (item) => (dispatch) => {
  Watched.removeMovie(item)

  dispatch({
    type   : ItemConstants.MARK_MOVIE_UNWATCHED,
    payload: item,
  })
}
