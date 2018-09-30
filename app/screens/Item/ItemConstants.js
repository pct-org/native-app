export const REDUCER_NAME = 'item'

export const INITIAL_STATE = {
  fetchingEpisodeTorrents: false,
  isLoading              : false,
  item                   : null,
  playerStatus           : null,
  selectedSeason         : null,
  selectedEpisode        : null,
}

export const FETCH_ITEM = `${REDUCER_NAME}.fetch.item`
export const PARTLY_FETCH_ITEM = `${REDUCER_NAME}.partly.fetch.item`
export const FETCHED_ITEM = `${REDUCER_NAME}.fetched.item`
export const UPDATE_ITEM = `${REDUCER_NAME}.update.item`
export const SELECT_SEASON_EPISODE = `${REDUCER_NAME}.select.season.episode`

export const FETCH_EPISODE_TORRENTS = `${REDUCER_NAME}.fetch.episode.torrents`
export const FETCHED_EPISODE_TORRENTS = `${REDUCER_NAME}.fetched.episode.torrents`
