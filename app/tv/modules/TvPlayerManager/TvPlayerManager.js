import React from 'react'

import withDownloadManager from 'modules/DownloadManager/withDownloadManager'
import withApollo from 'modules/GraphQL/withApollo'
import withIpFinder from 'modules/IpFinder/withIpFinder'
import PlayerManager from 'modules/PlayerManager'

@withDownloadManager
@withIpFinder
@withApollo
export default class TvPlayerManager extends PlayerManager {

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { item: { _id: oldId } } = prevProps
    const { item: { _id: newId }, item, ipFinder } = this.props

    if (oldId !== newId) {
      await this.stop()

      this.setState({
        mediaUrl: `http://${ipFinder.host}/watch/${item._id}`,
        progress: 0,
        casting: false,
        isBuffering: true,
        download: null,
        lastProgressSend: 0,
        startPosition: item.watched.progress === 100
          ? 0
          : item.watched.progress,
      })

      this.start()
    }
  }

}
