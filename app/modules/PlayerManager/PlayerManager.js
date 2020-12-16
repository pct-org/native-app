import React from 'react'
import { View, InteractionManager } from 'react-native'

import { progressMutation } from 'modules/GraphQL/ProgressGraphQL'
import { StartStreamMutation, StopStreamMutation } from 'modules/GraphQL/DownloadGraphQL'

export class PlayerManager extends React.Component {

  constructor(props) {
    super(props)

    const { ipFinder, item } = props

    this.state = {
      mediaUrl: `http://${ipFinder.host}/watch/${item._id}`,
      progress: 0,
      casting: false,
      isBuffering: true,
      download: null,
      lastProgressSend: 0,
      startPosition: item.watched.progress === 100
        ? 0
        : item.watched.progress,
      subtitleUri: null,
    }
  }

  componentDidMount() {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      this.start()
    })
  }

  componentWillUnmount() {
    this.stop()
  }

  start = async() => {
    // Start the stream
    await this.startStream().then(() => {
      this.pollDownload()
    })
  }

  stop = async() => {
    const { downloadManager, item } = this.props

    // Stop polling for the download info
    downloadManager.stopPollDownload(item)

    // Stop the stream
    await this.stopStream()
  }

  handleSetProgress = ({ currentTime, duration, progress }) => {
    const { lastProgressSend } = this.state

    let newLastProgressSend = lastProgressSend

    // We don't want to spam the graph api
    if ((lastProgressSend + 0.001) < progress) {
      const progressToSend = parseFloat(`${progress * 100}`).toFixed(2)

      newLastProgressSend = progress

      // After 95 we don't update anymore
      if (progressToSend > 95) {
        newLastProgressSend = 100
      }

      this.doProgressUpdateMutation(progressToSend)
    }

    this.setState({
      currentTime,
      duration,
      progress,
      lastProgressSend: newLastProgressSend,
    })
  }

  handleSelectSubtitle = (subtitle) => {
    const { ipFinder, item } = this.props

    this.setState({
      subtitleUri: `http://${ipFinder.host}/subtitle/${item._id}/${subtitle.code}`,
    })
  }

  /**
   * Does the start stream mutation
   *
   * @returns {Promise<void>}
   */
  startStream = async() => {
    const { apollo, item, torrent } = this.props

    return apollo.mutate({
      mutation: StartStreamMutation,
      variables: {
        _id: item._id,
        itemType: item.type,
        torrentType: torrent.type || undefined,
        quality: torrent.quality,
      },
    })
  }

  /**
   * Does the stop stream mutation
   *
   * @returns {Promise<void>}
   */
  stopStream = async() => {
    const { apollo, item } = this.props

    await apollo.mutate({
      mutation: StopStreamMutation,
      variables: {
        _id: item._id,
      },
    })
  }

  pollDownload = () => {
    const { downloadManager, item } = this.props

    downloadManager.pollDownload(item, (data) => {
      // If the progress is 100 then stop polling
      if (data.progress === 100) {
        downloadManager.stopPollDownload(item)
      }

      this.setState({
        isBuffering: data.progress < 3,
        download: data,
      })
    })
  }

  doProgressUpdateMutation = async(progress) => {
    const { apollo, item } = this.props

    await apollo.mutate({
      mutation: progressMutation,
      variables: {
        _id: item._id,
        type: item.type,
        progress: parseFloat(progress),
      },
    })
  }

  getChildProps = () => {
    const { mediaUrl, startPosition } = this.state
    const { download, isBuffering, subtitleUri } = this.state

    return {
      mediaUrl,
      startPosition,
      download,
      isBuffering,
      subtitleUri,
      selectSubtitle: this.handleSelectSubtitle,
      setProgress: this.handleSetProgress,
    }
  }

  render() {
    const { style, children } = this.props

    return (
      <View style={style}>

        {children(this.getChildProps())}

      </View>
    )
  }
}

export default PlayerManager
