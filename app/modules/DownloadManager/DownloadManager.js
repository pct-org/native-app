import React from 'react'

import withApollo from 'modules/GraphQL/withApollo'
import { RemoveDownloadMutation, StartDownloadMutation } from 'modules/GraphQL/DownloadGraphQL'

import DownloadManagerContext from './DownloadManagerContext'

export class DownloadManager extends React.Component {

  state = {
    downloads: [],
  }

  handleStartDownload = async(item, quality) => {
    let download = this.handleGetDownload(item._id)

    if (!download) {
      const { apollo } = this.props

      const { data: { download: newDownload } } = await apollo.mutate({
        variables: {
          _id: item._id,
          itemType: item.type,
          quality,
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

    this.setState({
      downloads: downloads.filter(down => down._id !== item._id),
    })
  }

  handleGetDownload = (_id) => {
    const { downloads } = this.state

    return downloads.find(down => down._id === _id)
  }

  handleDownloadExists = (_id) => {
    return !!this.handleGetDownload(_id)
  }

  getValue = () => {
    return {
      startDownload: this.handleStartDownload,
      updateDownload: this.handleUpdateDownload,
      removeDownload: this.handleRemoveDownload,
      getDownload: this.handleGetDownload,
      downloadExists: this.handleDownloadExists,
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
