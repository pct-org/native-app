import React from 'react'
import { BackHandler } from 'react-native'
import TorrentStreamer from 'react-native-torrent-streamer'

import PlayerScreen from './PlayerScreen'

export default class VideoPlayer extends PlayerScreen {

  componentDidMount() {
    const { navigation: { state: { params: { torrent, item } } } } = this.props

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    TorrentStreamer.addEventListener('error', this.handleTorrentError)
    TorrentStreamer.addEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.addEventListener('ready', this.handleTorrentReady)

    // Start
    TorrentStreamer.start(torrent.url)

    // Fetch subs
    // SubtitlesManager.search(item, torrent).then((subs) => {
    //   this.setState({
    //     subs,
    //   })
    // })

    //
    // this.setState({
    //   url          : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    //   buffer       : '100',
    //   doneBuffering: true,
    //   loading      : false,
    // })
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)

    TorrentStreamer.removeEventListener('error', this.handleTorrentError)
    TorrentStreamer.removeEventListener('status', this.handleTorrentStatus)
    TorrentStreamer.removeEventListener('ready', this.handleTorrentReady)

    TorrentStreamer.stop()

    this.staticServer.kill()
  }

}
