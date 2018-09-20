import { REDUCER_NAME } from './ItemConstants'

export const getItem                    = state => state[REDUCER_NAME].item
export const getSelectedSeason          = state => state[REDUCER_NAME].selectedSeason
export const getSelectedEpisode         = state => state[REDUCER_NAME].selectedEpisode
export const getIsLoading               = state => state[REDUCER_NAME].isLoading
export const getFetchingEpisodeTorrents = state => state[REDUCER_NAME].fetchingEpisodeTorrents
