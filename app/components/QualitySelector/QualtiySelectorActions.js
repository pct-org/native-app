import { Constants } from 'popcorn-sdk'
import Popcorn from 'modules/PopcornSDK'

import * as ItemConstants from 'screens/Item/ItemConstants'

export const fetchedBetterOnes = (item, episode) => (dispatch) => {
  Popcorn.searchEpisode(
    item,
    episode,
  ).then((results) => {
    if (item.type === Constants.TYPE_MOVIE) {
      dispatch({
        type   : ItemConstants.FETCHED_BETTER_FOR_MOVIE,
        payload: {
          newTorrents: results,
        },
      })

    } else if (item.type === Constants.TYPE_SHOW) {
      dispatch({
        type   : ItemConstants.FETCHED_BETTER_FOR_EPISODE,
        payload: {
          season     : episode.season,
          episode    : episode.number,
          newTorrents: results,
        },
      })
    } else if (item.type === Constants.TYPE_SHOW_EPISODE) { // From My Episodes
      // TODO:: This one still needs to be done

      // dispatch({
      //   type   : ItemConstants.FETCHED_BETTER_FOR_EPISODE,
      //   payload: {
      //     season     : episode.season,
      //     episode    : episode.number,
      //     newTorrents: results,
      //   },
      // })
    }
  })
}
