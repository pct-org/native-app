import React from 'react'
import { StyleSheet } from 'react-native'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import OptionsItem from '../OptionsItem'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 0,
    marginTop: dimensions.UNIT * 2,
  },

  divider: {
    marginVertical: dimensions.UNIT * 2,
  },

})

export const OptionsItemTorrent = ({
  torrent,
  disabled,
  download,
  startDownload,
  variant,
  onPress,
}) => {
  const isItemDisabled = React.useMemo(() => {
    if (!download) {
      return disabled
    }

    return !(download.torrentType === torrent.type && download.quality === torrent.quality)
  }, [download, disabled])

  const labelLine2 = React.useMemo(() => {
    if (!isItemDisabled && download?.status === constants.STATUS_DOWNLOADING) {
      return download.timeRemaining
    }

    return `${torrent.provider} - ${torrent.sizeString}`
  }, [download, isItemDisabled])

  const subLabel = React.useMemo(() => {
    if (!isItemDisabled && download?.status === constants.STATUS_DOWNLOADING) {
      return `${download.numPeers} peer${download.numPeers > 1 ? 's' : ''}`
    }

    return null

  }, [download, isItemDisabled])

  const subLabelLine2 = React.useMemo(() => {
    if (!isItemDisabled && download?.status === constants.STATUS_DOWNLOADING) {
      return `${download.progress}% / ${download.speed}`
    }

    if (!isItemDisabled && download?.status !== constants.STATUS_COMPLETE) {
      return download?.status
    }

    return null

  }, [download, isItemDisabled])

  const itemIcon = React.useMemo(() => {
    if (!isItemDisabled && download?.status === constants.STATUS_COMPLETE) {
      return 'cloud-check'
    }

    if (!isItemDisabled && download?.status === constants.STATUS_FAILED) {
      return 'cloud-alert'
    }

    return variant === constants.TYPE_DOWNLOAD
      ? 'cloud-download'
      : 'play-circle-outline'
  }, [download, isItemDisabled, variant])

  const handleOnTorrentClick = () => {
    if (onPress) {
      return () => onPress(torrent, download)
    }

    if (download) {
      return null
    }

    return () => startDownload(torrent)
  }

  return (
    <OptionsItem
      disabled={isItemDisabled}
      key={`${torrent.type}-${torrent.quality}`}
      icon={itemIcon}
      downloading={
        download &&
        !isItemDisabled &&
        [
          constants.STATUS_CONNECTING,
          constants.STATUS_DOWNLOADING,
        ].includes(download.status)
      }
      label={torrent.quality}
      labelLine2={labelLine2}
      subLabel={subLabel}
      subLabelLine2={subLabelLine2}
      onPress={handleOnTorrentClick()}
    />
  )
}

OptionsItemTorrent.defaultProps = {
  variant: constants.TYPE_DOWNLOAD,
}

export default OptionsItemTorrent
