import React from 'react'
import { View, StyleSheet } from 'react-native'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { useBottomSheet } from 'modules/BottomSheetManager'

import IconButton from 'components/IconButton'

import OptionsGroup from '../OptionsGroup'
import OptionsHeader from '../OptionsHeader'
import OptionsItem from '../OptionsItem'
import ItemTorrents from './ItemTorrents'

export const styles = StyleSheet.create({

  marginBottomOnly: {
    marginVertical: 0,
    marginBottom: dimensions.UNIT * 2,
  },

})

export const ItemOptions = ({
  item,
  style,
  variant,
  visible,
  animatable,
  onClose,
  onTorrentPress,
  canOpenBottomSheet,
}) => {
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useBottomSheet()

  const getBottomSheetConfig = () => {
    // When allTorrents changes update the content heights
    const startHeight = variant === constants.TYPE_DOWNLOAD
      ? 300
      : 150
    const initialBottomSheetHeight = startHeight + (item.torrents.length * 47)
    const contentHeight = startHeight + (allTorrents.length * 47)

    return {
      renderContent: renderBottomSheetContent,
      snapPoints: [
        initialBottomSheetHeight,
        contentHeight > dimensions.SCREEN_HEIGHT_NO_STATUS_BAR
          ? dimensions.SCREEN_HEIGHT_NO_STATUS_BAR
          : contentHeight,
        0,
      ],
      contentHeight,
      onClose,
    }
  }

  const handleSettingsPress = () => {
    // If we don't have the check or the check returns true then we can open it
    if (!canOpenBottomSheet || canOpenBottomSheet()) {
      openBottomSheet(getBottomSheetConfig())

    } else if (onClose) {
      onClose()
    }
  }

  const allTorrents = React.useMemo(() => {
    // The order that we want it in
    const order = ['2160p', '3D', '1080p', '1080p-bl', '720p', '720p-ish', '480p']

    let torrents = [...item.torrents]

    if (item.searchedTorrents && item.searchedTorrents.length > 0) {
      torrents = [...item.torrents, ...item.searchedTorrents]
    }

    return torrents.sort((torrentA, torrentB) => (
      order.indexOf(torrentA.quality) - order.indexOf(torrentB.quality)
    ))

  }, [item._id, item.torrents, item.searchedTorrents])

  React.useEffect(() => {
    updateBottomSheet(getBottomSheetConfig())

  }, [allTorrents])

  React.useEffect(() => {
    if (visible) {
      handleSettingsPress()
    }

  }, [visible])

  const handleTorrentPress = !onTorrentPress
    ? undefined
    : React.useCallback((torrent, download) => {
      closeBottomSheet()

      onTorrentPress(torrent, download)
    }, [])

  const renderBottomSheetContent = React.useCallback(() => {
    return (
      <View>
        <OptionsHeader
          label={
            item.type === constants.TYPE_EPISODE
              ? `${item.number}. ${item.title}`
              : item.title
          } />

        <ItemTorrents
          item={item}
          variant={variant}
          torrents={allTorrents}
          onPress={handleTorrentPress} />

        {variant === constants.TYPE_DOWNLOAD && (
          <>
            <OptionsGroup
              withDivider={variant === constants.TYPE_DOWNLOAD}
              style={styles.marginBottomOnly}>
              <OptionsItem
                disabled
                icon={'eye-outline'}
                label={
                  item.watched.complete
                    ? i18n.t('Mark Unwatched')
                    : i18n.t('Mark Watched')
                } />
            </OptionsGroup>

            <OptionsGroup>
              <OptionsItem
                disabled
                icon={'content-copy'}
                label={i18n.t('Copy to phone')}
                subLabel={'Item needs to be downloaded for this to become available'} />
            </OptionsGroup>
          </>
        )}
      </View>
    )
  }, [item, variant])

  if (variant === constants.TYPE_STREAM) {
    return (
      <IconButton
        onPress={handleSettingsPress}
        style={style}
        name={'play-circle-outline'}
        animatable={{
          animation: 'fadeIn',
          useNativeDriver: true,
          duration: constants.ANIMATION_DURATIONS.enteringScreen,
        }}
        size={
          item.itemType === constants.TYPE_MY_EPISODE
            ? dimensions.ICON_PLAY_DEFAULT
            : dimensions.ICON_PLAY_BIG
        }
      />
    )
  }

  return (
    <IconButton
      onPress={handleSettingsPress}
      style={style}
      animatable={animatable}
      name={'dots-vertical'}
      color={'primary'}
      emphasis={'medium'}
    />
  )
}

ItemOptions.defaultProps = {
  variant: constants.TYPE_DOWNLOAD,
  visible: false,
  onClose: null,
  onTorrentPress: null,
  canOpenBottomSheet: null,
  animatable: null,
}

export default ItemOptions
