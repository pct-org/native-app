import React from 'react'
import { ToastAndroid } from 'react-native'

import constants from 'modules/constants'
import i18n from 'modules/i18n/i18n'
import withApollo from 'modules/GraphQL/withApollo'
import { DownloadQuery, RemoveDownloadMutation, StartDownloadMutation } from 'modules/GraphQL/DownloadGraphQL'

import DownloadManagerContext from './DownloadManagerContext'

export class DownloadManager extends React.Component {

  pollingDownloads = []

  state = {
    downloads: [],
  }

  handleStartDownload = async(item, torrent) => {
    let download = this.handleGetDownload(item._id)

    if (!download) {
      const { apollo } = this.props

      const { data: { download: newDownload } } = await apollo.mutate({
        variables: {
          _id: item._id,
          itemType: item.type,
          torrentType: torrent.type || undefined,
          quality: torrent.quality,
        },
        mutation: StartDownloadMutation,
      })

      const { downloads } = this.state

      this.setState({
        downloads: [
          ...downloads,
          newDownload,
        ],
      })

      download = newDownload
    }

    return download
  }

  handleUpdateDownload = (download) => {
    const { downloads } = this.state

    this.setState({
      downloads: downloads.map((down) => {
        if (down._id === download._id) {
          return {
            ...down,
            ...download,
          }
        }

        return down
      }),
    })
  }

  handleRemoveDownload = async(item) => {
    const { apollo } = this.props
    const { downloads } = this.state

    await apollo.mutate({
      variables: {
        _id: item._id,
      },
      mutation: RemoveDownloadMutation,
    })

    // Also stop polling if we where
    this.handleStopPollDownload(item)

    this.setState({
      downloads: downloads.filter(down => down._id !== item._id),
    })

    // TODO:: Show snackbar instead of toast
    ToastAndroid.show(i18n.t('"{{title}}" removed', { title: item.title }), ToastAndroid.SHORT)
  }

  handleGetDownload = (_id) => {
    const { downloads } = this.state

    return downloads.find(down => down._id === _id)
  }

  handleDownloadExists = (_id) => {
    return !!this.handleGetDownload(_id)
  }

  /**
   * Shows the correct message for a download on press
   *
   * @param download
   */
  handleDownloadPress = (download) => {
    let message = i18n.t('Hold long to remove')

    if (download.status === constants.STATUS_FAILED) {
      message = i18n.t('Hold long to retry')

    } else if (download.status === constants.STATUS_DOWNLOADING) {
      message = i18n.t('Hold long to cancel')
    }

    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  /**
   * Does the stop stream mutation
   *
   * @returns {Promise<void>}
   */
  handlePollDownload = (download, callback) => {
    const { apollo } = this.props

    this.pollingDownloads[download._id] = apollo.watchQuery({
      query: DownloadQuery,
      pollInterval: 1000,
      variables: {
        _id: download._id,
      },
    })
      .subscribe(({ data }) => {
        callback(data?.download ?? null)
      })
  }

  /**
   * Stops polling the download
   *
   * @param download
   */
  handleStopPollDownload = (download) => {
    console.log('handleStopPollDownload', download)
    // Unsubscribe
    this.pollingDownloads[download._id]?.unsubscribe()

    // Remove it from the polling downloads
    delete this.pollingDownloads[download._id]
  }

  getValue = () => {
    return {
      startDownload: this.handleStartDownload,
      updateDownload: this.handleUpdateDownload,
      removeDownload: this.handleRemoveDownload,
      getDownload: this.handleGetDownload,
      downloadExists: this.handleDownloadExists,
      onPress: this.handleDownloadPress,
      pollDownload: this.handlePollDownload,
      stopPollDownload: this.handleStopPollDownload,
    }
  }

  render() {
    const { children } = this.props

    return (
      <DownloadManagerContext.Provider value={this.getValue()}>
        {children}
      </DownloadManagerContext.Provider>
    )
  }

}

export default withApollo(DownloadManager)
