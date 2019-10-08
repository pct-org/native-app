import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ToastAndroid } from 'react-native'
import LottieView from 'lottie-react-native'
import Snackbar from 'react-native-snackbar'
import { useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import { DownloadQuery } from 'modules/GraphQL/DownloadGraphQL'

import BaseButton from 'components/BaseButton'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import Typography from 'components/Typography'
import * as Animatable from 'react-native-animatable'
import QualitySelector from '../QualitySelector'

export const styles = StyleSheet.create({

  downloadStatus: {
    textAlign: 'center',
  },

})

export const QualityIcon = ({ handleOnPress, handleRemoveDownload, item, download: downloadProp, variant, itemType, style }) => {
  const [
    executeQuery,
    {
      called: queryCalled,
      data: downloadData,
      stopPolling: stopPollingDownload,
    },
  ] = useLazyQuery(
    DownloadQuery,
    {
      pollInterval: 1000,
      skip: queryCalled,
      variables: {
        _id: item._id,
      },
    },
  )

  const download = downloadData
    ? downloadData.download
    : downloadProp

  useEffect(() => {
    if (download || (item.download && item.download.downloading && !item.download.downloadComplete)) {
      executeQuery()
    }

    return () => {
      if (stopPollingDownload) {
        stopPollingDownload()
      }
    }
  }, [downloadProp])

  console.log('download',download)
  if (variant === QualitySelector.VARIANT_DOWNLOAD) {
    if (item.download || download) {
      const downloadStatus = download
        ? download.status
        : item.download.downloadStatus

      return (
        <BaseButton
          onPress={() => {
            ToastAndroid.show(
              item.downloading
                ? i18n.t('Hold long to cancel')
                : i18n.t('Hold long to remove'),
              ToastAndroid.SHORT,
            )
          }}
          onLongPress={() => {
            if (stopPollingDownload) {
              stopPollingDownload()
            }

            // TODO:: Show snackbar instead of toast
            ToastAndroid.show(i18n.t('"{{title}}" removed', { title: item.title }), ToastAndroid.SHORT)

            handleRemoveDownload()
          }}
        >
          <Animatable.View
            animation={'fadeIn'}
            useNativeDriver>
            {downloadStatus === 'downloading' && (
              <LottieView
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require('assets/lottie/cloud-download.json')}
                autoPlay
                loop />
            )}

            {['queued', 'complete'].indexOf(downloadStatus) > -1 && (
              <Icon
                size={24}
                name={downloadStatus === 'queued'
                  ? 'cloud'
                  : 'cloud-check'
                }
                color={'primary'}
                emphasis={'high'} />
            )}

            {downloadStatus !== 'complete' && (
              <Typography
                style={styles.downloadStatus}
                emphasis={'medium'}
                variant={'captionSmall'}>
                {
                  downloadStatus === 'downloading' && download
                    ? download.progress
                    : downloadStatus
                }
              </Typography>
            )}
          </Animatable.View>
        </BaseButton>
      )
    }

    return (
      <IconButton
        size={24}
        onPress={handleOnPress}
        color={'primary'}
        emphasis={'medium'}
        name={'cloud-download'} />
    )
  }

  return (
    <IconButton
      handleOnPress={handleOnPress}
      style={style}
      name={'play-circle-outline'}
      size={itemType === 'my-episode'
        ? 30
        : 45
      } />
  )
}

QualityIcon.propTypes = {}

QualityIcon.defaultProps = {}

export default QualityIcon
