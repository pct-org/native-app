// @flow
import type { TorrentType } from 'api/Torrents/TorrentsTypes'

export type ContentType = {
  id: string,
  title: string,
  year: string,
  images: {
    poster: ImageType,
    fanart: ImageType,
  },
  type: string,
  rating: RatingType,
  summary: string,
  genres: string,
  runtime: RuntimeType,
}

export type MovieType = ContentType & {
  certification: string,
  trailer: string,
  watched: {
    complete: boolean,
    progress: number,
  },
  torrents: {
    '1080p': TorrentType,
    '720p': TorrentType,
  },
}

export type ShowType = ContentType & {
  genres: string,
  seasons: Array<SeasonType>,
}

export type SeasonType = {
  showId: string,
  title: string,
  summary: string,
  number: number,
  episodes: Array<EpisodeType>,
  watched: number,
  type: string,
  images: {
    poster: ImageType,
  },
}

export type EpisodeType = {
  id: string,
  showId: string,
  title: string,
  number: number,
  season: number,
  summary: string,
  aired: number,
  watched: {
    complete: boolean,
    progress: number,
  },
  torrents: {
    '1080p': TorrentType,
    '720p': TorrentType,
    '420p': TorrentType,
  },
  type: string,
}

export type ImageType = {
  full: string,
  high: string,
  medium: string,
  thumb: string,
}

export type RatingType = {
  stars: number,
  percentage: number,
}

export type RuntimeType = {
  full: string,
  hours: number,
  minutes: number,
  inMinutes: number,
}

export type filterType = {
  sort?: 'populaity' | 'trending',
}
