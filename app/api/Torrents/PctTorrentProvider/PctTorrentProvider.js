// @flow
import axios from 'axios'

import * as MetadataConstant from 'api/Metadata/MetadataConstants'
import * as Helpers from './PctTorrentHelpers'
import type { TorrentProviderInterface } from '../TorrentsProviderInterface'
import type { MovieType, ShowType, ShowDetailType } from './PctTorrentTypes'

export default class PctTorrentProvider implements TorrentProviderInterface {

  defaultFilters = {
    limit: 50,
    sort : 'trending',
    day  : new Date().getDate(),
  }

  popcornAPI: axios = axios.create({
    baseURL: 'https://movies-v2.api-fetch.website/',
  })

  getMovies = (page: number = 1, filters = {}) => (
    this.popcornAPI.get(`movies/${page}`, { params: { ...this.defaultFilters, ...filters } })
      .then(({ data: movies }) => this.formatMovies(movies))
  )

  getMovie = (itemId: string) => (
    this.popcornAPI.get(`movie/${itemId}`)
      .then(({ data: movie }) => this.formatMovie(movie, { params: { day: this.defaultFilters.day } }))
  )

  getShows = (page: number = 1, filters = {}) => (
    this.popcornAPI.get(`shows/${page}`, { params: { ...this.defaultFilters, ...filters } })
      .then(({ data: shows }) => this.formatShows(shows))
  )

  getShow = (itemId: string) => (
    this.popcornAPI.get(`show/${itemId}`, { params: { day: this.defaultFilters.day } })
      .then(({ data: show }) => this.formatShow(show, true))
  )

  formatMovies = (movies: Array<MovieType>) => (movies.map((movie: MovieType) => this.formatMovie(movie)))

  formatMovie = (movie: MovieType) => ({
    id           : movie.imdb_id,
    title        : movie.title,
    year         : movie.year,
    certification: movie.certification,
    summary      : movie.synopsis,
    runtime      : Helpers.formatRuntimeMinutesToObject(movie.runtime),
    trailer      : movie.trailer,
    images       : Helpers.formatImages(movie.images),
    genres       : movie.genres,
    rating       : Helpers.formatRating(movie.rating),
    torrents     : Helpers.formatTorrents(movie.torrents.en),
    type         : MetadataConstant.TYPE_MOVIE,
    watched      : {
      complete: false,
      progress: 0,
    },
  })

  formatShows = (shows: Array<ShowType>) => (shows.map(show => this.formatShow(show)))

  formatShow = (show: ShowType | ShowDetailType, isDetail: boolean = false) => {
    let formattedShow = {
      id         : show.imdb_id,
      title      : show.title,
      year       : show.year,
      images     : Helpers.formatImages(show.images),
      rating     : Helpers.formatRating(show.rating),
      num_seasons: show.num_seasons,
      type       : MetadataConstant.TYPE_SHOW,
      watched    : {
        complete: false,
        progress: 0,
      },
    }

    if (isDetail) {
      formattedShow = {
        ...formattedShow,
        runtime: Helpers.formatRuntimeMinutesToObject(show.runtime),
        seasons: Helpers.formatShowEpisodes(show.episodes),
        summary: show.synopsis,
        genres : show.genres,
        status : show.status,
      }
    }

    return formattedShow
  }

  getStatus = () => this.popcornAPI.get().then(res => res.ok).catch(() => false)

}
