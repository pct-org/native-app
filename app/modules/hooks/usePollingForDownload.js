import React from 'react'

import constants from 'modules/constants'
import { useDownloadManager } from 'modules/DownloadManager'

/**
 * States that are valid to pull
 * @type {(string)[]}
 */
export const validPollStates = [
  constants.STATUS_QUEUED,
  constants.STATUS_CONNECTING,
  constants.STATUS_DOWNLOADING,
]

/**
 * Starts polling for a certain download
 */
export const usePollingForDownload = ({ _id }) => {
  const downloadManager = useDownloadManager()

  const download = downloadManager.getDownload(_id)

  React.useEffect(() => {
    if (download && validPollStates.includes(download.status)) {
      downloadManager.pollDownload(download)
    }

    return () => {
      if (download) {
        downloadManager.stopPollDownload(download)
      }
    }
  }, [download?._id, download?.status])

  return download
}

export default usePollingForDownload
