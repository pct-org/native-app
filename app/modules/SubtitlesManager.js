import { TextTrackType } from 'react-native-video'
import { Constants } from 'popcorn-sdk'

import PopcornSDK from 'modules/PopcornSDK'
import sortAB from 'modules/utils/sortAB'

export default new (class SubtitlesManager {

  search = async(item, torrent) => {
    const subs = []

    const isShow = item.type === Constants.TYPE_SHOW_EPISODE

    // // Fetch subs
    const foundSubtitles = await PopcornSDK.searchForSubtitles(
      isShow
        ? item.show
        : item,

      torrent,

      isShow
        ? item.season
        : null,

      isShow
        ? item.number
        : null,
    )

    Object.keys(foundSubtitles).forEach((langCode) => {
      const sub = foundSubtitles[langCode]

      subs.push({
        title   : sub.lang,
        language: sub.langcode,
        type    : TextTrackType.VTT, // "text/vtt"
        uri     : sub.vtt,
      })
    })

    return subs.sort(sortAB('title'))
  }

})()
