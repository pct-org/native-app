import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ToastAndroid } from 'react-native'
import LottieView from 'lottie-react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
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

  lottieContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    if (download && download.status !== constants.STATUS_REMOVED) {
      return (
        <BaseButton
          onPress={() => {
            ToastAndroid.show(
              download.status === constants.STATUS_DOWNLOADING
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
