import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StatusBar, StyleSheet, ActivityIndicator, View, BackHandler } from 'react-native'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'

import Typography from 'components/Typography'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import SubSelector from 'components/SubSelector'
import Orientation from 'react-native-orientation'

import { StartStreamMutation, StopStreamMutation, DownloadQuery } from './DownloadGraphQL'
import VideoAndControls from './VideoAndControls'

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

  const [startStream, { called: calledStartStream, loading, data }] = useMutation(
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

  const { showControls } = {}

  const toggleControls = () => {

  }

  const toggleControlsOff = () => {

  }

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

  const isDownloadLoading = loading
                            || downloadLoading
                            || !downloadData
                            || download.progress < 3

  if (download && download.progress === 100) {
    // Stop polling when progress is 100
    stopPolling()
  }

  // if (download) {
  //   console.log('URL:', `http://10.0.2.2:3000/watch/${download._id}`)
  //   console.log('URL:', `http://192.168.1.67:3000/watch/${download._id}`)
  //   console.log('URL:', `http://localhost:3000/watch/${download._id}`)
  // }

  return (
    <View style={styles.listContainer}>

      <StatusBar
        hidden={false}
        animated />

      {/*{isDownloadLoading && (*/}
      {/*  <View style={[styles.fullScreen, styles.loadingContainer]}>*/}

      {/*    <ActivityIndicator size={60} color={'#FFF'} />*/}

      {/*    <Typography*/}
      {/*      style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}*/}
      {/*      variant={'title'}>*/}
      {/*      {item && item.show && (*/}
      {/*        `${item.show.title} - ${item.title}`*/}
      {/*      )}*/}

      {/*      {item && !item.show && (*/}
      {/*        `${item.title}`*/}
      {/*      )}*/}
      {/*    </Typography>*/}

      {/*    {download && (*/}
      {/*      <React.Fragment>*/}
      {/*        {download && download.status !== 'connecting' && (*/}
      {/*          <Typography style={{ marginTop: 10 }}>*/}
      {/*            {i18n.t('Buffering')}*/}
      {/*          </Typography>*/}
      {/*        )}*/}

      {/*        {!download || download.status === 'connecting' && (*/}
      {/*          <Typography style={{ marginTop: 10 }}>*/}
      {/*            {download ? i18n.t('Connecting') : i18n.t('Queued')}*/}
      {/*          </Typography>*/}
      {/*        )}*/}

      {/*        <Typography variant={'body2'} style={{ marginTop: 5 }}>*/}
      {/*          {(download.progress / 3 * 100).toFixed(2)}% / {download.speed}*/}
      {/*        </Typography>*/}
      {/*      </React.Fragment>*/}
      {/*    )}*/}

      {/*  </View>*/}
      {/*)}*/}

      {(!isDownloadLoading) && (
        <React.Fragment>

          <VideoAndControls
            item={item}
            url={`http://192.168.1.67:3000/watch/${download._id}`}
            playOtherEpisode={playItem}
            showControls={showControls}>

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
