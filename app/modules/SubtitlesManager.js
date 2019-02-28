import { TextTrackType } from 'react-native-video'

import PopcornSDK from 'modules/PopcornSDK'
import sortAB from 'modules/utils/sortAB'

export default new (class SubtitlesManager {

  search = async(item) => {
    const subs = []

    // Fetch subs
    const foundSubtitles = await PopcornSDK.searchForSubtitles(item)

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
