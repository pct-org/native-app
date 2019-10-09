import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ToastAndroid } from 'react-native'
import LottieView from 'lottie-react-native'
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
      data,
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

  useEffect(() => {
    if (downloadProp) {
      executeQuery()
    }

    return () => {
      if (stopPollingDownload) {
        console.log('stopPollingDownload')
        stopPollingDownload()
      }
    }
  }, [downloadProp])

  const download = downloadProp && !data
    ? downloadProp
    : data
      ? data.download
      : null

  if (variant === QualitySelector.VARIANT_DOWNLOAD) {
    if (download && download.status !== 'removed') {
      return (
        <BaseButton
          onPress={() => {
            ToastAndroid.show(
              download.status === 'downloading'
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
            {download.status === 'downloading' && (
              <LottieView
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require('assets/lottie/cloud-download.json')}
                autoPlay
                loop />
            )}

            {['queued', 'connecting', 'complete'].indexOf(download.status) > -1 && (
              <Icon
                size={24}
                name={download.status === 'complete'
                  ? 'cloud-check'
                  : 'cloud'
                }
                color={'primary'}
                emphasis={'high'} />
            )}

            {download.status !== 'complete' && (
              <Typography
                style={styles.downloadStatus}
                emphasis={'medium'}
                variant={'captionSmall'}>
                {
                  download.status === 'downloading'
                    ? download.progress
                    : download.status
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
