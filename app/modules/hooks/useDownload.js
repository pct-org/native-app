import React from 'react'

import { useDownloadManager } from 'modules/DownloadManager'

/**
 * Returns a download from the download manager
 */
export const useDownload = (item) => {
  const downloadManager = useDownloadManager()

  return [
    downloadManager.getDownload(item._id),
    downloadManager
  ]
}

export default useDownload
