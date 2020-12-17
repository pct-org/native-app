import colors from 'modules/colors'
import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

import dimensions from 'modules/dimensions'
import IconButton from 'components/IconButton'

const ICON_SIZE = 76

export const PlayPauseIcon = ({ paused, handlePauseVideo, handlePlayVideo, loading }) => (
  <View
    style={{
      position: 'absolute',
      width: ICON_SIZE,
      height: ICON_SIZE,
      zIndex: 2000,
      left: (dimensions.SCREEN_HEIGHT - ICON_SIZE + 55) / 2,
      top: (dimensions.SCREEN_WIDTH - ICON_SIZE) / 2,
    }}
    pointerEvents={'box-none'}>

    {!paused && !loading && (
      <IconButton
        onPress={handlePauseVideo}
        name={'pause'}
        color={'primary'}
        size={dimensions.ICON_PLAY_BIG} />
    )}

    {paused && !loading && (
      <IconButton
        onPress={handlePlayVideo}
        name={'play'}
        color={'primary'}
        size={dimensions.ICON_PLAY_BIG} />
    )}

    {loading && (
      <ActivityIndicator
        size={dimensions.ICON_PLAY_BIG}
        color={colors.PRIMARY_COLOR_200} />
    )}
  </View>
)

PlayPauseIcon.propTypes = {
  paused: PropTypes.bool,
  loading: PropTypes.bool,
  handlePauseVideo: PropTypes.func.isRequired,
  handlePlayVideo: PropTypes.func.isRequired,
}

PlayPauseIcon.defaultProps = {
  paused: false,
  loading: false,
}

export default PlayPauseIcon
