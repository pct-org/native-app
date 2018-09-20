import { getHealth, formatRuntimeMinutesToObject } from 'api/Torrents/TorrentsHelpers'
import type { ImageType, TorrentType, RatingType } from './PctTorrentTypes'

export const formatImages = (images: ImageType) => {
  const replaceWidthPart = (uri: string, replaceWith: string) => uri.replace('w500', replaceWith)

  return {
    poster: {
      full  : replaceWidthPart(images.poster, 'original'),
      high  : replaceWidthPart(images.poster, 'w1280'),
      medium: replaceWidthPart(images.poster, 'w780'),
      thumb : replaceWidthPart(images.poster, 'w342'),
    },
    fanart: {
      full  : replaceWidthPart(images.fanart, 'original'),
      high  : replaceWidthPart(images.fanart, 'w1280'),
      medium: replaceWidthPart(images.fanart, 'w780'),
      thumb : replaceWidthPart(images.fanart, 'w342'),
    },
  }
}

export const formatTorrents = (torrents, type = 'movie') => {
  const formatTorrent = (torrent: TorrentType, quality: string) => ({
    ...torrent,
    quality,
    health: getHealth(torrent.seed || torrent.seeds, torrent.peer || torrent.peers),
    seeds : torrent.seed || torrent.seeds,
    peers : torrent.peer || torrent.peers,
  })

  if (type === 'movie') {
    return {
      '1080p': !torrents['1080p'] ? null : formatTorrent(torrents['1080p'], '1080p'),
      '720p' : !torrents['720p'] ? null : formatTorrent(torrents['720p'], '720p'),
    }
  }

  return {
    '1080p': !torrents['1080p'] ? null : formatTorrent(torrents['1080p'], '1080p'),
    '720p' : !torrents['720p'] ? null : formatTorrent(torrents['720p'], '720p'),
    '480p' : !torrents['480p'] ? null : formatTorrent(torrents['480p'], '480p'),
  }
}

export const formatRating = (rating: RatingType) => ({
  stars: (rating.percentage / 100) * 5,
  ...rating,
})

export const formatShowEpisodes = (episodes) => {
  const seasons = []

  episodes.forEach((episode) => {
    if (!seasons[episode.season]) {
      seasons[episode.season] = []
    }

    seasons[episode.season][episode.episode] = {
      summary : episode.overview,
      season  : episode.season,
      number  : episode.season,
      episode : episode.episode,
      torrents: formatTorrents(episode.torrents, 'show'),
    }
  })

  return seasons
}

export {
  formatRuntimeMinutesToObject,
}
