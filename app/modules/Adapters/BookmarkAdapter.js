import DefaultAdapter from 'popcorn-sdk/Adapter'

import Bookmarks from '../db/Bookmarks'

export default new (class BookmarkAdapter extends DefaultAdapter {

  checkMovies = movies => Promise.all(movies.map(async(movie) => ({
    ...movie,
    bookmarked: await this.hasMovieBookmarked(movie),
  })))

  checkMovie = movie => new Promise(async(resolve) => {
    resolve({
      ...movie,
      bookmarked: await this.hasMovieBookmarked(movie),
    })
  })

  hasMovieBookmarked = async(movie) => {
    const bookmarks = await Bookmarks.getAllMovies()

    return bookmarks.filter(bookmark => bookmark.id === movie.id).length === 1
  }

  checkShows = shows => Promise.all(shows.map(async(show) => ({
    ...show,
    bookmarked: await this.hasShowBookmarked(show),
  })))

  checkShow = show => new Promise(async(resolve) => {
    resolve({
      ...show,
      bookmarked: await this.hasShowBookmarked(show),
    })
  })

  hasShowBookmarked = async(show) => {
    const bookmarks = await Bookmarks.getAllShows()

    return bookmarks.filter(bookmark => bookmark.id === show.id).length === 1
  }

})()
