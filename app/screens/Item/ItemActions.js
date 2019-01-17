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

export function getItem(itemToGet) {
  return (dispatch, getState) => new Promise(async(resolve) => {
    dispatch({
      type: ItemConstants.FETCH_ITEM,
    })

    const item = hasItem(itemToGet.id, itemToGet.type, getState())

    if (itemToGet.type === Constants.TYPE_MOVIE) {
      if (item) {
        resolve(dispatch(fetchedItem(
          await Popcorn.checkAdapters('checkMovie')(item),
        )))

      } else {
        resolve(Popcorn.getMovie(itemToGet).then(movie => dispatch(fetchedItem(movie))))
      }

    } else if (itemToGet.type === Constants.TYPE_SHOW) {
      if (item) {
        dispatch(partlyFetchedItem(
          await Popcorn.checkAdapters('checkShow')(item),
        ))
      }

      resolve(Popcorn.getShow(itemToGet).then(show => dispatch(fetchedItem(show))))
    }

    return null
  })
}

export const addToBookmarks = (item) => (dispatch) => {
  dispatch({
    type   : ItemConstants.ADD_TO_BOOKMARKS,
    payload: item,
  })

  Bookmarks.addItem(item)
}

export const removeFromBookmarks = (item) => (dispatch) => {
  dispatch({
    type   : ItemConstants.REMOVE_FROM_BOOKMARKS,
    payload: item,
  })

  Bookmarks.removeItem(item)
}

export const markWatched = (item) => (dispatch) => {
  dispatch({
    type   : ItemConstants.MARK_MOVIE_WATCHED,
    payload: item,
  })

  Watched.markMovie(item)
}

export const markUnwatched = (item) => (dispatch) => {
  dispatch({
    type   : ItemConstants.MARK_MOVIE_UNWATCHED,
    payload: item,
  })

  Watched.removeMovie(item)
}
