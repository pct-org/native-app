import useCorrect from 'modules/useCorrect'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Platform } from 'react-native'

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

  root: {
    zIndex: 2000,
    width: dimensions.ICON_SIZE_MEDIUM + (dimensions.UNIT * 2),
    right: useCorrect(
      dimensions.UNIT * 5,
      null,
      dimensions.UNIT,
    ),
  },

})

export const SelectSubtitle = ({
  pauseVideo,
  playVideo,
  selectSubtitle,
  subtitles,
  disabled,
}) => {
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useSideSheet()

  const handleSubtitleClick = React.useCallback((subtitle) => () => {
    selectSubtitle(subtitle)
    closeBottomSheet()
  }, [])

  const getBottomSheetConfig = () => {
    return {
      renderContent: renderSideSheetContent,
      onClose: () => {
        playVideo()
      },
    }
  }

  const renderSideSheetContent = React.useCallback(() => (
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
      style={styles.root}
      pointerEvents={'box-none'}>

      <IconButton
        onPress={handleOnOpenSubtitlesPress}
        name={'subtitles-outline'}
        color={'primary'}
        textProps={{
          transform: 'lowercase',
        }}
        size={
          Platform.isTV
            ? dimensions.ICON_SIZE_MEDIUM
            : dimensions.ICON_SIZE_DEFAULT
        }
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
