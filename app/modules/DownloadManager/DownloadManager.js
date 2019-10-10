import React from 'react'

import DownloadManagerContext from './DownloadManagerContext'

export default class DownloadManager extends React.Component {

  state = {
    downloads: []
  }

  handleAddDownload = (download) => {
    const { downloads } = this.state

    if (!this.handleDownloadExists(download._id)) {
      this.setState({
        downloads: [
          ...downloads,
          download,
        ],
      })
    }
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

  handleRemoveDownload = (_id) => {
    const { downloads } = this.state

    this.setState({
      downloads: downloads.filter(down => down._id !== _id),
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
      addDownload: this.handleAddDownload,
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
