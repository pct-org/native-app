import React from 'react'

import constants from 'modules/constants'

/**
 * States that are valid to pull
 * @type {(string)[]}
 */
const validPollStates = [
  constants.STATUS_QUEUED,
  constants.STATUS_CONNECTING,
  constants.STATUS_DOWNLOADING,
]

/**
 * Starts polling for a certain download
 *
 * @param download
 * @param downloadManager
 * @returns {unknown}
 */
export const usePollingForDownload = (download, downloadManager) => {
  const [data, setPollingData] = React.useState(null)

  React.useEffect(() => {
    if (download && validPollStates.includes(download.status)) {
      downloadManager.pollDownload(download, setPollingData)
    }

    return () => {
      if (download) {
        downloadManager.stopPollDownload(download)
      }
    }
  }, [download])

  return data
}

export default usePollingForDownload
