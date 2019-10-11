import constants from 'modules/constants'
import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { CastButton } from 'react-native-google-cast'

import colors from 'modules/colors'
import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import Typography from 'components/Typography'

import EpisodePlaying from '../EpisodePlaying'

const styles = StyleSheet.create({



})

export const BufferingCastingState = ({ casting, isBuffering, download, item, renderCastButton }) => {

  return (
    <View style={[styles.fullScreen, styles.bufferingContainer]}>

      <EpisodePlaying
        item={item}
      />

      {renderCastButton({
        right: (dimensions.SCREEN_WIDTH / 2) - (dimensions.ICON_CAST_SIZE / 2),
        bottom: dimensions.UNIT * 5,
      })}

      {!casting && (
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
            {download.progress.toFixed(2)}% / {download.speed}
          </Typography>
          <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
            {download.timeRemaining}
          </Typography>
        </React.Fragment>
      )}
    </View>
  )
}

BufferingCastingState.propTypes = {}

export default BufferingCastingState
