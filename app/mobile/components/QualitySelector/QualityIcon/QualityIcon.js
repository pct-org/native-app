import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import { DownloadQuery } from 'modules/GraphQL/DownloadGraphQL'
import usePollingForDownload from 'modules/GraphQL/usePollingForDownload'

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

export const QualityIcon = ({
  handleOnPress,
  handleRemoveDownload,
  item,
  download: downloadProp,
  downloadManager,
  variant,
  itemType,
  style,
}) => {
  const data = usePollingForDownload(
    variant !== constants.TYPE_STREAM
      ? downloadProp
      : null,
    downloadManager
  )

  const download = downloadProp && !data
    ? downloadProp
    : downloadProp && data
      ? data
      : null

  const getStatusText = () => {
    switch (download.status) {
      case constants.STATUS_DOWNLOADING:
        return `${download.progress}%`

      case constants.STATUS_COMPLETE:
        return download.quality

      default:
        return download.status
    }
  }

  if (variant === constants.TYPE_DOWNLOAD || variant === 'downloads') {
    if (download && download.status !== constants.STATUS_REMOVED && (variant !== 'downloads' || download?.status === constants.STATUS_DOWNLOADING)) {
      return (
        <BaseButton
          onPress={() => downloadManager.onPress(download)}
          onLongPress={() => {
            // If status is failed we retry on long press
            if (download.status === constants.STATUS_FAILED) {
              handleOnPress()

            } else {
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
               constants.STATUS_FAILED,
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

            {download.status && (
              <Typography
                style={styles.downloadStatus}
                emphasis={'medium'}
                variant={'captionSmall'}>
                {
                  getStatusText()
                }
              </Typography>
            )}
          </Animatable.View>
        </BaseButton>
      )
    }

    if (variant !== 'downloads') {
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
  }

  return (
    <IconButton
      onPress={handleOnPress}
      style={style}
      name={'play-circle-outline'}
      size={
        itemType === 'my-episode' || variant === 'downloads'
          ? dimensions.ICON_PLAY_DEFAULT
          : dimensions.ICON_PLAY_BIG
      } />
  )
}

QualityIcon.propTypes = {
  handleOnPress: PropTypes.func.isRequired,
  handleRemoveDownload: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  download: PropTypes.object,
  variant: PropTypes.oneOf(['stream', 'download', 'downloads']).isRequired,
  itemType: PropTypes.string,
  style: PropTypes.object,
}

QualityIcon.defaultProps = {
  download: null,
  style: null,
  itemType: null,
}

export default QualityIcon
