import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar, StyleSheet, ActivityIndicator, View, BackHandler } from 'react-native'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'

import Typography from 'components/Typography'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import SubSelector from 'components/SubSelector'

import { StartStreamMutation, DownloadQuery } from './DownloadGraphQL'
import VideoAndControls from './VideoAndControls'

export const Player = ({ navigation: { state: { params: { item, playQuality } } } }) => {
  const [startStream, { called, loading, data }] = useMutation(
    StartStreamMutation,
    {
      variables: {
        _id: item._id,
        type: item.type,
        quality: playQuality,
      },
    },
  )

  const [
    executeQuery,
    {
      startPolling,
      stopPolling,
      called: queryCalled,
      loading: downloadLoading,
      data: downloadData,
    }] = useLazyQuery(
    DownloadQuery,
    {
      pollInterval: 200, // 1000
      skip: queryCalled,
      variables: {
        _id: item._id,
      },
    },
  )

  console.log('queryCalled', queryCalled)
  console.log('data', data, item)
  if (!called) {
    // Start the stream
    startStream().then(() => {
      executeQuery()
    })
  }

  const { url, showControls } = {}
  const { doneBuffering, buffer, downloadSpeedFormatted, activeSub } = {}

  const getItemTitle = () => {
    if (item.show) {
      return `${item.show.title} - ${item.title}`
    }

    return item.title
  }

  const toggleControls = () => {

  }

  const toggleControlsOff = () => {

  }

  const download = loading || downloadLoading || !downloadData
    ? null
    : downloadData.download

  console.log('download', download)

  return (
    <View style={styles.listContainer}>

      <StatusBar
        hidden={false}
        animated />

      {!download && (
        <View style={[styles.fullScreen, styles.loadingContainer]}>

          {!download && (
            <ActivityIndicator size={60} color={'#FFF'} />
          )}

          <Typography
            style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}
            variant={'title'}>
            {getItemTitle()}
          </Typography>

          {/*{buffer !== 0 && !doneBuffering && (*/}
          {/*  <React.Fragment>*/}
          {/*    <Typography style={{ marginTop: 10 }}>*/}
          {/*      {i18n.t('Buffering')}*/}
          {/*    </Typography>*/}

          {/*    <Typography variant={'body2'} style={{ marginTop: 5 }}>*/}
          {/*      {buffer}% / {downloadSpeedFormatted}*/}
          {/*    </Typography>*/}
          {/*  </React.Fragment>*/}
          {/*)}*/}

          {/*{buffer === 0 && (*/}
          {/*  <Typography style={{ marginTop: 10 }}>*/}
          {/*    {i18n.t('Connecting')}*/}
          {/*  </Typography>*/}
          {/*)}*/}

          {!downloadData && (
            <Typography style={{ marginTop: 10 }}>
              {i18n.t('Starting')}
            </Typography>
          )}

        </View>
      )}

      {!loading && (
        <React.Fragment>

          <VideoAndControls
            item={item}
            url={url}
            // playItem={this.playItem}
            showControls={showControls}
            activeSub={activeSub}>

          </VideoAndControls>

        </React.Fragment>
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  listContainer: {
    flex: 1,
    backgroundColor: 'black',
  },

  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  slider: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },

  castButton: {
    position: 'absolute',
    right: 24,
    top: 32,
    width: 50,
    height: 50,

    zIndex: 1001,
  },

  castingAdditionalControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },

  subsButton: {
    position: 'absolute',
    left: 18,
    top: 24,
    width: 50,
    height: 50,

    zIndex: 1001,
  },

  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },

  statItem: {
    width: 120,
    alignItems: 'center',
    zIndex: 1001,
  },

})

export default Player
