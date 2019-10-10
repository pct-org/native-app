import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import Orientation from 'react-native-orientation'

import colors from 'modules/colors'
import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import { StartStreamMutation, StopStreamMutation, DownloadQuery } from 'modules/GraphQL/DownloadGraphQL'

import Typography from 'components/Typography'

import VideoAndControls from './VideoAndControls'
import PlayingItemInfo from './PlayingItemInfo'
import DownloadInfo from './DownloadInfo'
import EpisodePlaying from './EpisodePlaying'

export const Player = ({ navigation: { state: { params: { item, playQuality } } } }) => {
  useEffect(() => {
      if (!calledStartStream) {
        // Start the stream
        startStream().then(() => {
          executeQuery()
        })
      }

      return () => {
        Orientation.lockToPortrait()

        if (!calledStopStream) {
          // Stop the stream
          stopStream()
        }
      }
    },
    [],
  )

  const [startStream, { called: calledStartStream, loading, data, error }] = useMutation(
    StartStreamMutation, { variables: { _id: item._id, itemType: item.type, quality: playQuality } },
  )

  const [stopStream, { called: calledStopStream }] = useMutation(
    StopStreamMutation, { variables: { _id: item._id } },
  )

  const [
    executeQuery, {
      called: queryCalled,
      loading: downloadLoading,
      data: downloadData,
      stopPolling,
    }] = useLazyQuery(
    DownloadQuery,
    {
      pollInterval: 1000,
      skip: queryCalled,
      variables: {
        _id: item._id,
      },
    },
  )

  /**
   * Play a other episode
   *
   * @param item
   * @param torrent
   */
  const playItem = (item, torrent) => {
    // First stop the existing stream
    if (!calledStopStream) {
      // Stop the stream
      stopStream()
    }

    // Stop the current polling
    if (stopPolling) {
      stopPolling()
    }

    // Start the new stream
    startStream({
      variables: {
        _id: item._id,
        itemType: item.type,
        quality: torrent.quality,
      },
    }).then(() => {
      // Start polling the new one
      executeQuery({
        variables: {
          _id: item._id,
        },
      })
    })
  }

  const download = loading || downloadLoading || !downloadData
    ? null
    : downloadData.download

  const isBuffering = loading
                      || downloadLoading
                      || !downloadData
                      || !download
                      || download.progress < 3


  if (download && download.progress === 100) {
    // Stop polling when progress is 100
    stopPolling()
  }

  console.log('item', item, isBuffering)
  console.log('download', download)
  console.log('downloadData', downloadData)
  console.log('error', error)

  return (
    <View style={styles.root}>

      {isBuffering && (
        <View style={[styles.fullScreen, styles.bufferingContainer]}>

          <EpisodePlaying
            item={item}
          />

          <ActivityIndicator
            size={50}
            style={{ marginTop: dimensions.UNIT * 5 }}
            color={colors.PRIMARY_COLOR_200} />

          {download && download.status !== 'connecting' && (
            <Typography style={{ marginTop: dimensions.UNIT * 3 }}>
              {i18n.t('Buffering')}
            </Typography>
          )}

          {!download || download.status === 'connecting' && (
            <Typography style={{ marginTop: dimensions.UNIT * 3 }}>
              {download ? i18n.t('Connecting') : i18n.t('Queued')}
            </Typography>
          )}

          {download && (
            <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
              {(download.progress / 3 * 100).toFixed(2)}% / {download.speed}
            </Typography>
          )}
        </View>
      )}

      {!isBuffering && download && (
        <VideoAndControls
          item={item}
          url={`http://192.168.43.228:3000/watch/${download._id}`}
          playOtherEpisode={playItem}>

          <PlayingItemInfo
            item={item}
          />

          <DownloadInfo
            {...download}
          />

        </VideoAndControls>
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: 'black',
  },

  bufferingContainer: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
