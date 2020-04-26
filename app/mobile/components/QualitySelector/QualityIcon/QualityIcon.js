import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ToastAndroid } from 'react-native'
import LottieView from 'lottie-react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import * as Animatable from 'react-native-animatable'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import { DownloadQuery } from 'modules/GraphQL/DownloadGraphQL'

import BaseButton from 'components/BaseButton'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import Typography from 'components/Typography'

export const styles = StyleSheet.create({

  downloadStatus: {
    textAlign: 'center',
  },

  lottieContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    if (downloadProp && downloadProp.status === constants.STATUS_DOWNLOADING) {
      executeQuery()
    }

    return () => {
      if (stopPollingDownload) {
        stopPollingDownload()
      }
    }
  }, [downloadProp])

  const download = downloadProp && !data
    ? downloadProp
    : data
      ? data.download
      : null

  if (variant === constants.TYPE_DOWNLOAD) {
    if (download && download.status !== constants.STATUS_REMOVED) {
      return (
        <BaseButton
          onPress={() => {
            let message = i18n.t('Hold long to remove')

            if (download.status === constants.STATUS_FAILED) {
              message = i18n.t('Hold long to retry')

            } else if (download.status === constants.STATUS_DOWNLOADING) {
              message = i18n.t('Hold long to cancel')
            }

            ToastAndroid.show(message, ToastAndroid.SHORT)
          }}
          onLongPress={() => {
            // If status is failed we retry on long press
            if (download.status === constants.STATUS_FAILED) {
              handleOnPress()

            } else {
              if (stopPollingDownload) {
                stopPollingDownload()
              }

              // TODO:: Show snackbar instead of toast
              ToastAndroid.show(i18n.t('"{{title}}" removed', { title: item.title }), ToastAndroid.SHORT)

              handleRemoveDownload()
            }
          }}
        >
          <Animatable.View
            style={[
              style,
              styles.lottieContainer,
            ]}
            animation={'fadeIn'}
            useNativeDriver>
            {download.status === constants.STATUS_DOWNLOADING && (
              <LottieView
                style={{
                  width: dimensions.ICON_SIZE_DEFAULT,
                  height: dimensions.ICON_SIZE_DEFAULT,
                }}
                source={require('assets/lottie/cloud-download.json')}
                autoPlay
                loop />
            )}

            {[
               constants.STATUS_QUEUED,
               constants.STATUS_CONNECTING,
               constants.STATUS_COMPLETE,
             ].indexOf(download.status) > -1 && (
               <Icon
                 size={dimensions.ICON_SIZE_DEFAULT}
                 name={download.status === constants.STATUS_COMPLETE
                   ? 'cloud-check'
                   : download.status === constants.STATUS_FAILED
                     ? 'cloud-alert'
                     : 'cloud'
                 }
                 color={'primary'}
                 emphasis={'high'} />
             )}

            {download.status !== constants.STATUS_COMPLETE && (
              <Typography
                style={styles.downloadStatus}
                emphasis={'medium'}
                variant={'captionSmall'}>
                {
                  download.status === constants.STATUS_DOWNLOADING
                    ? `${download.progress}%`
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
        size={dimensions.ICON_SIZE_DEFAULT}
        onPress={handleOnPress}
        style={style}
        color={'primary'}
        emphasis={'medium'}
        name={'cloud-download'} />
    )
  }

  return (
    <IconButton
      onPress={handleOnPress}
      style={style}
      name={'play-circle-outline'}
      size={itemType === 'my-episode'
        ? 30
        : 45
      } />
  )
}

QualityIcon.propTypes = {
  handleOnPress: PropTypes.func.isRequired,
  handleRemoveDownload: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  download: PropTypes.object,
  variant: PropTypes.string.isRequired,
  itemType: PropTypes.string,
  style: PropTypes.object,
}

QualityIcon.defaultProps = {
  download: null,
  style: null,
  itemType: null,
}

export default QualityIcon
