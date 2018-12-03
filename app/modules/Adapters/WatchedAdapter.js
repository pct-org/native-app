import DefaultAdapter from 'popcorn-sdk/Adapter'

import Watched from '../db/Watched'

export default new (class WatchedAdapter extends DefaultAdapter {

  checkMovie = movie => new Promise(async(resolve) => {
    const watchedMovies = await Watched.getAllMovies()

    resolve({
      ...movie,
      watched: {
        complete: watchedMovies.filter(watchedMovie => watchedMovie.id === movie.id).length === 1,
      },
    })
  })

  checkMovies = movies => new Promise(async(resolve) => {
    const watchedMovies = await Watched.getAllMovies()

    resolve(movies.map(movie => ({
      ...movie,
      watched: {
        complete: watchedMovies.filter(watchedMovie => watchedMovie.id === movie.id).length === 1,
      },
    })))
  })
  
})()
