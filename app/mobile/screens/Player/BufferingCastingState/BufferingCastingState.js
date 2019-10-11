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

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  castButton: {
    position: 'absolute',
    right: dimensions.UNIT * 4,
    top: dimensions.UNIT * 4,
    width: 50,
    height: 50,

    zIndex: 1001,
  },

})

export const BufferingCastingState = ({ download, item, casting, renderCastButton }) => {

  return (
    <View style={styles.root}>

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
          {
            download
              ? i18n.t('Connecting')
              : i18n.t('Queued')
          }
        </Typography>
      )}

      {download && (
        <Typography variant={'body2'} style={{ marginTop: dimensions.UNIT / 2 }}>
          {(download.progress / 3 * 100).toFixed(2)}% / {download.speed}
        </Typography>
      )}

    </View>
  )
}

BufferingCastingState.propTypes = {}

export default BufferingCastingState
