import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import * as QualitySelectorConstants from './QualitySelectorConstants'

export const fetchedBetterOnes = (item, episode = null, inMyEpisodes = false) => (dispatch) => {
  const method = episode ? 'searchEpisode' : 'search'

  dispatch({
    type: QualitySelectorConstants.FETCH_BETTER,
  })

  Popcorn[method](
    item,
    episode,
  ).then((results) => {
    if (item.type === Constants.TYPE_MOVIE) {
      dispatch({
        type   : QualitySelectorConstants.FETCHED_BETTER_FOR_MOVIE,
        payload: {
          item,
          newTorrents: results,
        },
      })

    } else if (item.type === Constants.TYPE_SHOW) {
      dispatch({
        type: inMyEpisodes
          ? QualitySelectorConstants.FETCHED_BETTER_FOR_MY_EPISODE
          : QualitySelectorConstants.FETCHED_BETTER_FOR_EPISODE,

        payload: {
          episodeId  : episode.id,
          season     : episode.season,
          episode    : episode.number,
          newTorrents: results,
        },
      })
    }
  })
}
