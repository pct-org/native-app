// @flow
export type ImageType = {
  poster: string,
  fanart: string,
  banner: string,
}

export type RatingType = {
  percentage: number,
  watching: number,
  votes: number,
  loved: number,
  hated: number,
}

export type MovieType = {
  _id: string,
  imdb_id: string,
  title: string,
  year: string,
  synopsis: string,
  runtime: string,
  released: number,
  trailer: string,
  certification: string,
  torrents: {
    en: {
      '1080p': TorrentType,
      '720p': TorrentType,
    }
  },
  genres: Array<string>,
  images: ImageType,
  rating: RatingType,
}

export type ShowType = {
  _id: string,
  imdb_id: string,
  tvdb_id: string,
  title: string,
  year: string,
  slug: string,
  num_seasons: number,
  images: ImageType,
  rating: RatingType
}

export type ShowDetailType = ShowType & {
  synopsis: string,
  runtime: string,
  country: string,
  network: string,
  air_day: string,
  air_time: string,
  status: string,
  last_updated: number,
  __v: number,
  episodes: Array,
  genres: Array<string>,
}

export type TorrentType = {
  url: string,
  seed: number,
  peer: number,
  size: number,
  filesize: string,
  provider: string,
}
