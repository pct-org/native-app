import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import { useSideSheet } from 'modules/SideSheetManager'

import IconButton from 'components/IconButton'
import OptionsHeader from 'mobile/components/OptionsHeader'
import OptionsGroup from 'mobile/components/OptionsGroup'
import OptionsItem from 'mobile/components/OptionsItem'

export const styles = StyleSheet.create({

  statusBar: {
    height: dimensions.STATUSBAR_HEIGHT,
    width: 200,
  },

})

export const SelectSubtitle = ({
  pauseVideo,
  playVideo,
  selectSubtitle,
  subtitles,
  disabled,
}) => {
  // TODO:: Create an "useSideSheet" that does the same but comes from the side
  // this can then also be used on tv
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useSideSheet()

  const handleSubtitleClick = React.useCallback((subtitle) => () => {
    selectSubtitle(subtitle)
    closeBottomSheet()
  }, [])

  const getBottomSheetConfig = () => {
    return {
      renderContent: renderBottomSheetContent,
      onClose: () => {
        playVideo()
      },
    }
  }

  const renderBottomSheetContent = React.useCallback(() => (
    <View>
      <View style={styles.statusBar} />
      <OptionsHeader label={i18n.t('Subtitles')} />

      <OptionsGroup>
        <OptionsItem
          onPress={handleSubtitleClick(null)}
          label={i18n.t('No subtitles')} />

        {subtitles.map((subtitle) => (
          <OptionsItem
            key={subtitle.code}
            onPress={handleSubtitleClick(subtitle)}
            label={subtitle.language} />
        ))}
      </OptionsGroup>
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
  selectSubtitle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  subtitles: PropTypes.array,
}

SelectSubtitle.defaultProps = {
  paused: false,
  disabled: false,
  subtitles: [],
}

export default React.memo(SelectSubtitle)
