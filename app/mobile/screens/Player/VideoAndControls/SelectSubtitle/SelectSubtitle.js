import Typography from 'components/Typography'
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import IconButton from 'components/IconButton'
import TextButton from 'components/TextButton'
import { useSideSheet } from 'modules/SideSheetManager'

export const SelectSubtitle = ({ pauseVideo, playVideo, selectSubtitle, subtitles, disabled }) => {
  // TODO:: Create an "useSideSheet" that does the same but comes from the side
  // this can then also be used on tv
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useSideSheet()

  const getBottomSheetConfig = () => {
    return {
      renderContent: renderBottomSheetContent,
      onClose: () => {
        playVideo()
      },
    }
  }

  const renderBottomSheetContent = React.useCallback(() => (
    <View style={{ marginTop: 40 }}>

      <TextButton
        onPress={() => selectSubtitle(null)}
      >
        NONE
      </TextButton>

      {subtitles.map((subtitle) => (
        <TextButton
          key={subtitle.code}
          onPress={() => selectSubtitle(subtitle)}
        >
          {subtitle.language}
        </TextButton>
      ))}
    </View>
  ), [subtitles])

  const handleOnOpenSubtitlesPress = () => {
    pauseVideo()

    openBottomSheet(getBottomSheetConfig())
  }

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2000,
        width: dimensions.ICON_SIZE_MEDIUM + (dimensions.UNIT * 2),
        right: dimensions.UNIT * 5,
        bottom: dimensions.UNIT * 2,
      }}
      pointerEvents={'box-none'}>

      <IconButton
        onPress={handleOnOpenSubtitlesPress}
        name={'subtitles-outline'}
        color={'primary'}
        textProps={{
          transform: 'lowercase',
        }}
        size={dimensions.ICON_SIZE_DEFAULT}
        disabled={disabled}>
        {i18n.t('Subtitles')}
      </IconButton>

    </View>
  )
}

SelectSubtitle.propTypes = {
  paused: PropTypes.bool,
  pauseVideo: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

SelectSubtitle.defaultProps = {
  paused: false,
  disabled: false,
}

export default React.memo(SelectSubtitle)
