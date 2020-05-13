import React, { useState, useEffect } from 'react'

import constants from 'modules/constants'

/**
 * Starts polling for a certain download
 *
 * @param download
 * @param downloadManager
 * @returns {unknown}
 */
export const usePollingForDownload = (download, downloadManager) => {
  const [data, setPollingData] = useState(null)

  useEffect(() => {
      if (download && [constants.STATUS_QUEUED, constants.STATUS_DOWNLOADING].includes(download.status)) {
        downloadManager.pollDownload(download, setPollingData)
      }

      return () => {
        if (download) {
          downloadManager.stopPollDownload(download)
        }
      }
    }, [download],
  )

  return data
}

export default usePollingForDownload
