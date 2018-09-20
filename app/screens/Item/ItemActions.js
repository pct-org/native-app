import Butter from 'api/Butter'
import { getBestTorrent } from 'api/Torrents/TorrentsHelpers'

import * as MetadataConstants from 'api/Metadata/MetadataConstants'
import * as ItemConstants from './ItemConstants'
import * as ItemSelectors from './ItemSelectors'
import * as HomeSelectors from '../Home/HomeSelectors'

export function hasItem(itemId, mode, state) {
  const pluralMode = MetadataConstants.PLURALS[mode]
  return HomeSelectors.getModes(state)[pluralMode].items.find(item => item.id === itemId)
}

export function fetchItem() {
  return {
    type: ItemConstants.FETCH_ITEM,
  }
}

export function fetchedItem(item) {
  return {
    type   : ItemConstants.FETCHED_ITEM,
    payload: item,
  }
}

export const updateItem = item => (dispatch, getState) => {
  const selectedItem = ItemSelectors.getItem(getState())

  if (selectedItem && selectedItem.id === item.id) {
    dispatch({
      type   : ItemConstants.UPDATE_ITEM,
      payload: item,
    })
  }
}

export function fetchEpisodeTorrents() {
  return {
    type: ItemConstants.FETCH_EPISODE_TORRENTS,
  }
}

export function fetchedEpisodeTorrents(item) {
  return {
    type   : ItemConstants.FETCHED_EPISODE_TORRENTS,
    payload: item,
  }
}

export function getItem(type, itemId) {
  return (dispatch, getState) => {
    dispatch(fetchItem())

    if (type === MetadataConstants.TYPE_MOVIE) {
      const item = hasItem(itemId, type, getState())

      if (item) {
        return dispatch(fetchedItem(item))
      }

      return Butter.getMovie(itemId).then(movie => dispatch(fetchedItem(movie)))

    } else if (type === MetadataConstants.TYPE_SHOW) {
      return Butter.getShow(itemId).then(show => dispatch(fetchedItem(show)))
    }

    return null
  }
}

export const searchEpisodeTorrents = (item, inSeason, forEpisode) => (dispatch) => {
  dispatch(fetchEpisodeTorrents())

  Butter.searchEpisode(item, inSeason, forEpisode).then((response) => {
    const bestTorrents = {}

    response.forEach(torrents => Object.keys(torrents).forEach((quality) => {
      const torrent = torrents[quality]
      if (!bestTorrents[torrent.quality] || getBestTorrent(bestTorrents[torrent.quality], torrent)) {
        bestTorrents[torrent.quality] = torrent
      }
    }))

    /**
     * Map the torrents to the right episode
     */
    const nItem = {
      ...item,
      seasons: item.seasons.map((season) => {
        if (season.number === inSeason) {
          return {
            ...season,
            episodes: season.episodes.map((episode) => {
              if (episode.number === forEpisode) {
                return {
                  ...episode,
                  torrents: {
                    '1080p': getBestTorrent(episode.torrents['1080p'], bestTorrents['1080p']),
                    '720p' : getBestTorrent(episode.torrents['720p'], bestTorrents['720p']),
                    '480p' : getBestTorrent(episode.torrents['480p'], bestTorrents['480p']),
                  },
                  searched: true,
                }

              }
              return episode

            }),
          }

        }
        return season

      }),
    }

    dispatch(fetchedEpisodeTorrents(nItem))
  })
}

export function selectSeasonAndEpisode(season, episode) {
  return {
    type   : ItemConstants.SELECT_SEASON_EPISODE,
    payload: {
      selectedSeason : season,
      selectedEpisode: episode,
    },
  }
}
