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

  createBookMarkItem = ({ id, ids, title, type, images, seasons }) => ({
    id,
    ids,
    title,
    type,
    images,
    updatedAt : Date.now(),
    lastSeason: seasons ? seasons[seasons.length - 1] : null,
    watched   : {
      complete: false,
    },
  })

  addItem = (item) => {
    this.bookmarks.push(item)

    this.setItem(this.KEY_BOOKMARKS, JSON.stringify(this.bookmarks))
  }

  removeItem = ({ id }) => {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)

    this.setItem(this.KEY_BOOKMARKS, JSON.stringify(this.bookmarks))
  }

  updateItem = ({ id, ...rest }) => {
    this.bookmarks = this.bookmarks.map(bookmark => {
      if (bookmark.id !== id) {
        return bookmark
      }

      return {
        ...bookmark,
        ...rest,
        updatedAt: Date.now(),
      }
    })

    this.setItem(this.KEY_BOOKMARKS, JSON.stringify(this.bookmarks))
  }

})()
