import { Constants } from 'popcorn-sdk'
import Base from './Base'

export default new (class BookmarksDB extends Base {

  KEY_BOOKMARKS = '@Popcorn:Bookmarks'

  bookmarks = []

  getAll = async() => {
    if (this.bookmarks.length > 0) {
      return this.bookmarks
    }

    const bookmarks = await this.getItem(this.KEY_BOOKMARKS)

    if (bookmarks) {
      this.bookmarks = JSON.parse(bookmarks)
      console.log('this.bookmarks', this.bookmarks)
      return this.bookmarks
    }

    return this.bookmarks
  }

  getAllMovies = async() => {
    await this.getAll()

    return this.bookmarks.filter(bookmark => bookmark.type === Constants.TYPE_MOVIE)
  }

  getAllShows = async() => {
    await this.getAll()

    return this.bookmarks.filter(bookmark => bookmark.type === Constants.TYPE_SHOW)
  }

  addItem = ({ id, title, type, images }) => {
    this.bookmarks.push({
      id,
      title,
      type,
      images,
    })

    this.setItem(this.KEY_BOOKMARKS, JSON.stringify(this.bookmarks))
  }

  removeItem = ({ id }) => {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)

    this.setItem(this.KEY_BOOKMARKS, JSON.stringify(this.bookmarks))
  }

})()
