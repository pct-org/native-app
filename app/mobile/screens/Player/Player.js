import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import colors from 'modules/colors'
import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import MobilePlayerManager from 'mobile/modules/MobilePlayerManager'

import Typography from 'components/Typography'
import ItemInfo from 'components/ItemInfo'

import VideoAndControls from './VideoAndControls'
import DownloadInfo from './DownloadInfo'

export const Player = ({ route: { params: { item, torrent } } }) => (
  <MobilePlayerManager
    item={item}
    torrent={torrent}
    style={styles.root}>
    {({
      casting,
      renderCastButton,
      mediaUrl,
      setProgress,
      startPosition,
      isBuffering,
      download,
      subtitleUri,
      selectSubtitle,
    }) => (
      <React.Fragment>
        {(isBuffering || casting) && (
          <View style={[styles.fullScreen, styles.bufferingContainer]}>

            <ItemInfo
              style={styles.playingInfo}
              item={item}
            />

            {renderCastButton({
              right: (dimensions.SCREEN_WIDTH / 2) - (dimensions.ICON_CAST_SIZE / 2),
              bottom: dimensions.UNIT * 5,
            })}

            {(!casting || isBuffering) && (
              <ActivityIndicator
                size={50}
                style={{ marginTop: dimensions.UNIT * 5 }}
                color={colors.PRIMARY_COLOR_200} />
            )}

            {isBuffering && (
              <React.Fragment>
                {download && download.status !== constants.STATUS_CONNECTING && (
                  <Typography style={{ marginTop: dimensions.UNIT * 3 }}>
                    {i18n.t('Buffering')}
                  </Typography>
                )}

                {!download || download.status === constants.STATUS_CONNECTING && (
                  <Typography style={{ marginTop: dimensions.UNIT * 3 }}>
                    {download ? i18n.t('Connecting') : i18n.t('Queued')}
                  </Typography>
                )}

                {download && (
                  <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
                    {(download.progress / 3 * 100).toFixed(2)}% / {download.speed}
                  </Typography>
                )}
              </React.Fragment>
            )}

            {(!isBuffering && download.status !== constants.STATUS_COMPLETE) && (
              <React.Fragment>
                <Typography style={{ marginTop: dimensions.UNIT * 3 }}>
                  {download.status}
                </Typography>

                <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
                  {download.progress}% / {download.speed}
                </Typography>

                <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
                  {download.timeRemaining}
                </Typography>
              </React.Fragment>
            )}
          </View>
        )}

        {!isBuffering && !casting && download && (
          <VideoAndControls
            item={item}
            subtitleUri={subtitleUri}
            selectSubtitle={selectSubtitle}
            subtitles={download.subtitles}
            url={mediaUrl}
            startPosition={startPosition}
            setProgress={setProgress}>

            <ItemInfo
              style={styles.playingInfoInPlayer}
              item={item}
              pointerEvents={'none'}
              truncateSynopsis
            />

            <DownloadInfo {...download} />

            {renderCastButton({
              right: dimensions.UNIT * 16,
              bottom: dimensions.UNIT * 2.4,
            })}

          </VideoAndControls>
        )}
      </React.Fragment>
    )}
  </MobilePlayerManager>
)

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

  playingInfo: {
    marginRight: dimensions.UNIT * 2,
    marginLeft: dimensions.UNIT * 2,
  },

  playingInfoInPlayer: {
    position: 'absolute',
    top: dimensions.UNIT * 3,
    left: dimensions.UNIT * 4,
    zIndex: 500,
  },

})

export default Player
