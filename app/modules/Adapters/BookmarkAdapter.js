import DefaultAdapter from 'popcorn-sdk/Adapter'

import Bookmarks from '../db/Bookmarks'

export default new (class BookmarkAdapter extends DefaultAdapter {

  checkMovie = movie => new Promise(async(resolve) => {
    const bookmarks = await Bookmarks.getAllMovies()

    resolve({
      ...movie,
      bookmarked: bookmarks.filter(bookmark => bookmark.id === movie.id).length === 1,
    })
  })

  checkShow = show => new Promise(async(resolve) => {
    const bookmarks = await Bookmarks.getAllShows()

    resolve({
      ...show,
      bookmarked: bookmarks.filter(bookmark => bookmark.id === show.id).length === 1,
    })
  })

})()
