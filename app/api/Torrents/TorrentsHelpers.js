// @flow
import hasOwnProperty from 'has-own-property'

export const formatShowToSearchQuery = (title, season, episode) => {
  const searchTitle = title.toLowerCase()
    .replace(' ', '.')

  return `${searchTitle}.${formatSeasonEpisodeToString(season, episode)}`
}

export const formatSeasonEpisodeToString = (season, episode) => (
  `s${String(season).length === 1 ? `0${String(season)}` : String(season)
  }e${String(episode).length === 1 ? `0${String(episode)}` : String(episode)}`
)

export const getHealth = (seeds, peers) => {
  const ratio = seeds && !!peers ? seeds / peers : seeds

  // Normalize the data. Convert each to a percentage
  // Ratio: Anything above a ratio of 5 is good
  const normalizedRatio = Math.min((ratio / 5) * 100, 100)
  // Seeds: Anything above 30 seeds is good
  const normalizedSeeds = Math.min((seeds / 30) * 100, 100)

  // Weight the above metrics differently
  // Ratio is weighted 60% whilst seeders is 40%
  const weightedRatio = normalizedRatio * 0.6
  const weightedSeeds = normalizedSeeds * 0.4
  const weightedTotal = weightedRatio + weightedSeeds

  // Scale from [0, 100] to [0, 3]. Drops the decimal places
  const scaledTotal = ((weightedTotal * 3) / 100) || 0

  if (scaledTotal === 1) {
    return {
      text  : 'decent',
      color : '#FF9800',
      number: 1,
      ratio,
    }

  } else if (scaledTotal >= 2) {
    return {
      text  : 'healthy',
      color : '#4CAF50',
      number: 2,
      ratio,
    }
  }

  return {
    text  : 'poor',
    color : '#F44336',
    number: 0,
    ratio,
  }
}

export const formatRuntimeMinutesToObject = (runtimeInMinutes: number) => {
  const hours   = runtimeInMinutes >= 60 ? Math.round(runtimeInMinutes / 60) : 0
  const minutes = runtimeInMinutes % 60

  return {
    full     : hours > 0
      ? `${hours} ${hours > 1 ? 'hours' : 'hour'}${minutes > 0
        ? ` ${minutes} minutes`
        : ''}`
      : `${minutes} minutes`,
    short    : hours > 0
      ? `${hours} ${hours > 1 ? 'hrs' : 'hr'}${minutes > 0
        ? ` ${minutes} min`
        : ''}`
      : `${minutes} min`,
    hours,
    minutes,
    inMinutes: parseInt(runtimeInMinutes, 10),
  }
}

export const determineQuality = (magnet: string): string => {
  const lowerCaseMetadata = magnet.toLowerCase()

  // Filter non-english languages
  if (hasNonEnglishLanguage(lowerCaseMetadata)) {
    return null
  }

  // Most accurate categorization
  if (lowerCaseMetadata.includes('1080')) return '1080p'
  if (lowerCaseMetadata.includes('720')) return '720p'
  if (lowerCaseMetadata.includes('480')) return '480p'

  // Guess the quality 1080p
  if (lowerCaseMetadata.includes('bluray')) return '1080p'
  if (lowerCaseMetadata.includes('blu-ray')) return '1080p'

  // Guess the quality 720p, prefer english
  if (lowerCaseMetadata.includes('dvd')) return '720p'
  if (lowerCaseMetadata.includes('rip')) return '720p'
  if (lowerCaseMetadata.includes('mp4')) return '720p'
  if (lowerCaseMetadata.includes('web')) return '720p'
  if (lowerCaseMetadata.includes('hdtv')) return '720p'
  if (lowerCaseMetadata.includes('eng')) return '720p'

  return null
}

export const hasNonEnglishLanguage = (metadata: string): boolean => {
  if (metadata.includes('french')) return true
  if (metadata.includes('german')) return true
  if (metadata.includes('greek')) return true
  if (metadata.includes('dutch')) return true
  if (metadata.includes('hindi')) return true
  if (metadata.includes('português')) return true
  if (metadata.includes('portugues')) return true
  if (metadata.includes('spanish')) return true
  if (metadata.includes('español')) return true
  if (metadata.includes('espanol')) return true
  if (metadata.includes('latino')) return true
  if (metadata.includes('russian')) return true
  if (metadata.includes('subtitulado')) return true

  return false
}

export const getBestTorrent = (torrentOne, torrentTwo) => {
  if ((!torrentOne || typeof torrentOne === 'undefined') && (!torrentTwo || typeof torrentTwo === 'undefined')) {
    return null
  }

  if (torrentOne && (!torrentTwo || typeof torrentTwo === 'undefined')) {
    return torrentOne

  } else if ((!torrentOne || typeof torrentOne === 'undefined') && torrentTwo) {
    return torrentTwo

  } else if (torrentOne.health.ratio > torrentTwo.health.ratio) {
    return torrentOne
  }

  return torrentTwo
}

export const getHighestQuality = (torrents) => {
  let bestQuality = null

  Object.keys(torrents).forEach((quality) => {
    if (bestQuality === null || parseInt(bestQuality, 10) < parseInt(quality, 10)) {
      if (torrents[quality] !== null) {
        bestQuality = quality
      }
    }
  })

  if (bestQuality) {
    return torrents[bestQuality]
  }

  return null
}

export const itemHasTorrents = (item) => {
  if (!hasOwnProperty(item, 'torrents')) {
    return false
  }

  return !!getHighestQuality(item.torrents)
}
