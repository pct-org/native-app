import React from 'react'
import { View, StyleSheet } from 'react-native'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { useBottomSheet } from 'modules/BottomSheetManager'

import IconButton from 'components/IconButton'

import OptionsGroup from './OptionsGroup'
import OptionsHeader from './OptionsHeader'
import OptionsItem from './OptionsItem'
import ItemTorrents from './ItemTorrents'

export const styles = StyleSheet.create({

  marginBottomOnly: {
    marginVertical: 0,
    marginBottom: dimensions.UNIT * 2,
  },

})

export const ItemOptions = ({ item, style }) => {
  const [openBottomSheet, updateBottomSheet] = useBottomSheet()

  const getBottomSheetConfig = () => {
    // When allTorrents changes update the content heights
    const startHeight = 300
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
    }
  }

  const handleSettingsPress = () => {
    openBottomSheet(getBottomSheetConfig())
  }

  const allTorrents = React.useMemo(() => {
    // The order that we want it in
    const order = ['2160p', '3D', '1080p', '1080p-bl', '720p', '720p-ish', '480p']

    return [...item.torrents, ...item.searchedTorrents].sort((torrentA, torrentB) => (
      order.indexOf(torrentA.quality) - order.indexOf(torrentB.quality)
    ))

  }, [item._id, item.torrents, item.searchedTorrents])

  React.useEffect(() => {
    updateBottomSheet(getBottomSheetConfig())

  }, [allTorrents])

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
          torrents={allTorrents} />

        <OptionsGroup
          withDivider
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
      </View>
    )
  }, [item])

  return (
    <IconButton
      onPress={handleSettingsPress}
      style={style}
      name={'dots-vertical'}
      color={'primary'}
      emphasis={'medium'}
    />
  )
}

export default ItemOptions
