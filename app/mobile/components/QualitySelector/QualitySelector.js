import React from 'react'

import constants from 'modules/constants'
import { useWatchOnTvManager } from 'modules/WatchOnTvManager'
import useDownload from 'modules/hooks/useDownload'
import { navigate } from 'modules/RootNavigation'

import ItemOptions from '../ItemOptions'

export const QualitySelector = ({ item, ...props }) => {
  const { connected, playOnTv } = useWatchOnTvManager()
  const [download] = useDownload(item)

  const handleOnTorrentPress = (torrent) => {
    if (connected) {
      playOnTv(item, torrent)

    } else {
      navigate(
        'Player',
        {
          item,
          torrent,
        },
      )
    }
  }

  const handleCanOpenBottomSheet = () => {
    if (download) {
      handleOnTorrentPress({
        quality: download.quality,
        type: download.torrentType,
      })

      return false
    }

    return true
  }

  return (
    <ItemOptions
      {...props}
      item={item}
      variant={constants.TYPE_STREAM}
      canOpenBottomSheet={handleCanOpenBottomSheet}
      onTorrentPress={handleOnTorrentPress}
    />
  )
}

export default QualitySelector
