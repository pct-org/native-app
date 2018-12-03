import Base from './Base'

export default new (class WatchedDB extends Base {

  KEY_MOVIES_WATCHED = '@Popcorn:Watched:Movies'

  watchedMovies = []

  getAllMovies = async() => {
    if (this.watchedMovies.length > 0) {
      return this.watchedMovies
    }

    const watched = await this.getItem(this.KEY_MOVIES_WATCHED)

    if (watched) {
      this.watchedMovies = JSON.parse(watched)

      return this.watchedMovies
    }

    return this.watchedMovies
  }

  markMovie = ({ id }) => {
    this.watchedMovies.push({
      id,
    })

    this.setItem(this.KEY_MOVIES_WATCHED, JSON.stringify(this.watchedMovies))
  }

  removeMovie = ({ id }) => {
    this.watchedMovies = this.watchedMovies.filter(watchedMovie => watchedMovie.id !== id)

    this.setItem(this.KEY_MOVIES_WATCHED, JSON.stringify(this.watchedMovies))
  }

})()
