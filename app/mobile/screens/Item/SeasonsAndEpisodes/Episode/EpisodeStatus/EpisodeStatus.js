import React, { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ToastAndroid } from 'react-native'
import LottieView from 'lottie-react-native'

import i18n from 'modules/i18n'
import { DownloadQuery, StartDownloadMutation, RemoveDownloadMutation } from 'modules/GraphQL/DownloadGraphQL'

import IconButton from 'components/IconButton'
import BaseButton from 'components/BaseButton'

export const EpisodeStatus = ({ _id, downloaded, downloading }) => {
  useEffect(() => {
    return () => {
      if (stopPollingDownload) {
        stopPollingDownload()
      }
    }
  }, [])

  const options = {
    variables: {
      _id,
    },
  }

  const [StartDownload] = useMutation(
    StartDownloadMutation,
    options,
  )

  const [RemoveDownload] = useMutation(
    RemoveDownloadMutation,
    options,
  )

  const [
    executeQuery, {
      called: queryCalled,
      loading: downloadLoading,
      data: downloadData,
      stopPolling: stopPollingDownload,
    }] = useLazyQuery(
    DownloadQuery,
    {
      pollInterval: 1000,
      skip: queryCalled,
      ...options,
    },
  )

  let episodeDownloading = downloadData
    ? downloadData.download
    : downloading

  if (!downloaded && episodeDownloading) {
    return (
      <BaseButton
        onPress={() => {
          ToastAndroid.show(i18n.t('Hold long to cancel'), ToastAndroid.SHORT)
        }}
        onLongPress={() => console.log('cancel', _id)}
      >
        <LottieView
          style={{
            width: 24,
            height: 24,
          }}
          source={require('assets/lottie/cloud-download.json')}
          autoPlay
          loop />
      </BaseButton>
    )
  }

  return (
    <IconButton
      size={24}
      onPress={() => console.log('onPress')}
      color={'primary'}
      emphasis={downloaded
        ? 'high'
        : 'medium'
      }
      name={downloaded
        ? 'cloud-check'
        : 'cloud-download'
      } />
  )
}

export default EpisodeStatus
