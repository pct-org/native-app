import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import * as ItemConstants from 'screens/Item/ItemConstants'
import * as HomeConstants from 'screens/Home/HomeConstants'

export const fetchedBetterOnes = (item, episode = null, inMyEpisodes = false) => (dispatch) => {
  const method = episode ? 'searchEpisode' : 'search'

  dispatch({
    type: ItemConstants.FETCH_BETTER,
  })

  Popcorn[method](
    item,
    episode,
  ).then((results) => {
    if (item.type === Constants.TYPE_MOVIE) {
      dispatch({
        type   : ItemConstants.FETCHED_BETTER_FOR_MOVIE,
        payload: {
          item,
          newTorrents: results,
        },
      })

    } else if (item.type === Constants.TYPE_SHOW) {
      dispatch({
        type: inMyEpisodes
          ? HomeConstants.FETCHED_BETTER_FOR_MY_EPISODE
          : ItemConstants.FETCHED_BETTER_FOR_EPISODE,

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
