import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import dimensions from 'modules/dimensions'
import Remote from 'tv/modules/Controls/Remote'
import IconButton from 'components/IconButton'

export const ICON_SIZE = 76

export const styles = StyleSheet.create({

  root: {
    zIndex: 2000,
  },

})

export const PlayPauseIcon = ({ paused, handlePauseVideo, handlePlayVideo, disabled }) => (
  <View
    style={styles.root}
    pointerEvents={'box-none'}>

    <IconButton
      onPress={Remote.onPress(
        paused
          ? handlePlayVideo
          : handlePauseVideo,
      )}
      name={
        paused
          ? 'play'
          : 'pause'
      }
      buttonProps={{
        hasTVPreferredFocus: !disabled,
      }}
      color={'primary'}
      size={dimensions.ICON_SIZE_TV_MEDIUM}
      disabled={disabled} />

  </View>
)

PlayPauseIcon.propTypes = {
  paused: PropTypes.bool,
  handlePauseVideo: PropTypes.func.isRequired,
  handlePlayVideo: PropTypes.func.isRequired,
}

PlayPauseIcon.defaultProps = {
  paused: false,
}

export default React.memo(PlayPauseIcon)
