// @flow
import type { MovieType, ShowType } from './MetadataTypes'

export interface MetadataProviderInterface {

  getMovies: (page: number, limit: number, options: Object) => Promise<MovieType>,

  getMovie: (itemId: string) => MovieType,

  getShows: (page: number, limit: number) => Promise<ShowType>,

  getShow: (itemId: string) => ShowType,

  getSeasons: (itemId: string, pctSeasons: Array) => Promise<void>,

  getStatus: () => Promise<boolean>,

}
