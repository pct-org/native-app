// @flow
import PctTorrentProvider from './Torrents/PctTorrentProvider'
import TorrentAdapter from './Torrents'

export default new (class {

  pctAdapter: PctTorrentProvider

  torrentAdapter: TorrentAdapter

  constructor() {
    this.pctAdapter = new PctTorrentProvider()
    this.torrentAdapter = new TorrentAdapter()
  }

  getMovies = (page: number = 1, filters: Object = {}) => (
    this.pctAdapter.getMovies(page, filters)
  )

  getMovie = (itemId: string) => (
    this.pctAdapter.getMovie(itemId)
  )

})()
