import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import Bookmarks from 'modules/db/Bookmarks'
import sortHighLow from 'modules/utils/sortHighLow'

import * as HomeConstants from './HomeConstants'
import * as HomeSelectors from './HomeSelectors'

export const fetchItems = () => ({
  type: HomeConstants.FETCH_ITEMS,
})

export const fetchedItems = (items, mode) => ({
  type   : HomeConstants.FETCHED_ITEMS,
  payload: {
    items,
    mode,
  },
})

export const clearItems = mode => ({
  type   : HomeConstants.CLEAR_ITEMS,
  payload: mode,
})

export const getItems = (mode, page = 1, givenFilters = {}) => (dispatch, getState) => {
  dispatch(fetchItems())

  const catchNoCon = ({ message }) => {
    if (message === 'Network Error') {
      dispatch({
        type: HomeConstants.ERROR_NO_CON,
      })
    }
  }

  const { filters: defaultFilters } = HomeSelectors.getModes(getState())[mode]

  const filters = {
    ...defaultFilters,
    ...givenFilters,
  }

  switch (mode) {
    case Constants.TYPE_MOVIE:
      return Popcorn.getMovies(page, filters).then(movies => dispatch(fetchedItems(movies, mode))).catch(catchNoCon)

    case 'movieSearch':
      // Clear the items
      dispatch(clearItems(mode))

      return Popcorn.getMovies(page, filters).then(movies => dispatch(fetchedItems(movies, mode))).catch(catchNoCon)

    case Constants.TYPE_SHOW:
      return Popcorn.getShows(page, filters).then(shows => dispatch(fetchedItems(shows, mode))).catch(catchNoCon)

    case 'showSearch':
      // Clear the items
      dispatch(clearItems(mode))

      return Popcorn.getShows(page, filters).then(shows => dispatch(fetchedItems(shows, mode))).catch(catchNoCon)

    case Constants.TYPE_BOOKMARK:
      const existingBookmarks = getState().home.modes.bookmark.items

      return Bookmarks.getAll().then((bookmarks) => {
        Popcorn.checkAdapters('checkMovies')(bookmarks).then(async bookmarks => {

          dispatch(
            fetchedItems(
              // If we already have bookmarks then don't add the existing ones again
              existingBookmarks.length > 0 ? [] : bookmarks,
              mode,
            ),
          )

          // Update my episodes section
          updateMyEpisodes(false)(dispatch)
        })
      })

    case 'bookmarkSearch':
      return Bookmarks.getAll().then(bookmarks => dispatch(
        fetchedItems(
          bookmarks.filter(bookmark => bookmark.title.toLowerCase().indexOf(filters.keywords.toLowerCase()) > -1),
          mode,
        ),
      ))

    default:
      return null
  }
}

export const updateMyEpisodes = (refresh = false) => (dispatch) => new Promise(async(resolve) => {
  dispatch({
    type: refresh
      ? HomeConstants.REFRESH_MY_EPISODES
      : HomeConstants.FETCH_MY_EPISODES,
  })

  const threeDaysAgo = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).getTime()
  const eightDaysAgo = new Date(new Date().getTime() - (8 * 24 * 60 * 60 * 1000)).getTime()

  const showBookmarks = await Bookmarks.getAllShows()
  const myEpisodes = []
  let bookmarksUpdated = 0

  if (showBookmarks.length === 0) {
    return resolve(dispatch({
      type   : HomeConstants.FETCHED_MY_EPISODES,
      payload: [],
    }))
  }

  showBookmarks.forEach(async(showBookmark) => {
    // Check if the bookmark is last updated three days ago or it is a refresh
    if (!showBookmark.updatedAt || showBookmark.updatedAt < threeDaysAgo || refresh) {
      const showBasic = await Popcorn.getShowBasic(showBookmark.id)
      const pctSeason = showBasic.seasons[showBasic.seasons.length - 1]

      // Older versions of bookmarks did not save ids
      if (!showBookmark.ids) {
        showBookmark = await Popcorn.getShowIds(showBasic)
      }

      // Only fetch the last season
      showBookmark.lastSeason = await Popcorn.metadataAdapter.getAdditionalSeasonAndEpisodesInfo(
        pctSeason.number,
        pctSeason,
        showBookmark,
      )

      // Update the bookmark in the DB
      Bookmarks.updateItem(showBookmark)
    }

    showBookmark.lastSeason.episodes.forEach((episode) => {
      if (episode.hasTorrents && episode.aired > eightDaysAgo && !episode.watched.complete) {
        myEpisodes.push({
          show: showBookmark,
          ...episode,
        })
      }
    })

    bookmarksUpdated = bookmarksUpdated + 1

    if (bookmarksUpdated === showBookmarks.length) {
      // Dispatch the updated bookmark
      resolve(dispatch({
        type   : HomeConstants.FETCHED_MY_EPISODES,
        payload: myEpisodes.sort(sortHighLow('aired')),
      }))
    }
  })
})
