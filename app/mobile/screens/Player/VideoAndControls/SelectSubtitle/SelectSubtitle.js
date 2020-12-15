import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import IconButton from 'components/IconButton'
import { useBottomSheet } from 'modules/BottomSheetManager'

export const SelectSubtitle = ({ handlePauseVideo, handlePlayVideo, selectSubtitle, subtitles }) => {
  // TODO:: Create an "useSideSheet" that does the same but comes from the side
  // this can then also be used on tv
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useBottomSheet()

  const getBottomSheetConfig = () => {
    return {
      renderContent: renderBottomSheetContent,
      snapPoints: [
        300,
        300,
        0,
      ],
      contentHeight: 300,
      onClose: console.log,
    }
  }

  const renderBottomSheetContent = React.useCallback(() => (
    <View>

    </View>
  ), [subtitles])

  const handleOnOpenSubtitlesPress = () => {
    openBottomSheet(getBottomSheetConfig())
  }

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2000,
        width: dimensions.ICON_SIZE_MEDIUM + (dimensions.UNIT * 2),
        right: dimensions.UNIT * 7 + dimensions.ICON_SIZE_MEDIUM,
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
        size={dimensions.ICON_SIZE_DEFAULT}>
        {i18n.t('Subtitles')}
      </IconButton>

    </View>
  )
}

SelectSubtitle.propTypes = {
  paused: PropTypes.bool,
  handlePauseVideo: PropTypes.func.isRequired,
  handlePlayVideo: PropTypes.func.isRequired,
}

SelectSubtitle.defaultProps = {
  paused: false,
}

export default SelectSubtitle
