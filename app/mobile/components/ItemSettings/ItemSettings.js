import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'

import IconButton from 'components/IconButton'
import BottomSheet from 'components/BottomSheet'
import Container from 'components/Container'

import SettingsGroup from './SettingsGroup'
import SettingsHeader from './SettingsHeader'
import SettingsItem from './SettingsItem'
import Torrents from './Torrents'

export const styles = StyleSheet.create({

  marginBottomOnly: {
    marginVertical: 0,
    marginBottom: dimensions.UNIT * 2,
  },

})

export const ItemSettings = ({ item, style }) => {
  const bottomSheet = React.useRef()

  const handleSettingsPress = () => {
    bottomSheet.current.snapTo(0)
  }

  const allTorrents = React.useMemo(() => {
    // The order that we want it in
    const order = ['2160p', '3D', '1080p', '1080p-bl', '720p', '720p-ish', '480p']

    return [...item.torrents, ...item.searchedTorrents].sort((torrentA, torrentB) => (
      order.indexOf(torrentA.quality) - order.indexOf(torrentB.quality)
    ))

  }, [item.torrents, item.searchedTorrents])

  const startHeight = 275
  const initialBottomSheetHeight = startHeight + (item.torrents.length * 50)
  const contentHeight = startHeight + (allTorrents.length * 50)

  return (
    <>
      <IconButton
        animatable={{
          animation: 'fadeIn',
          useNativeDriver: true,
          duration: constants.ANIMATION_DURATIONS.enteringScreen,
        }}
        onPress={handleSettingsPress}
        style={style}
        name={'dots-vertical'}
        color={'primary'}
        emphasis={'medium'}
      />

      <BottomSheet
        ref={bottomSheet}
        contentHeight={contentHeight}
        snapPoints={[
          initialBottomSheetHeight,
          contentHeight > dimensions.SCREEN_HEIGHT_NO_STATUS_BAR
            ? dimensions.SCREEN_HEIGHT_NO_STATUS_BAR
            : contentHeight,
          0,
        ]}>
        <SettingsHeader
          label={
            item.type === constants.TYPE_EPISODE
              ? `${item.number}. ${item.title}`
              : item.title
          } />

        <Torrents
          item={item}
          torrents={allTorrents} />

        <SettingsGroup
          withDivider
          style={styles.marginBottomOnly}>
          <SettingsItem
            disabled
            icon={'eye-outline'}
            label={'Mark watched'} />
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem
            disabled
            icon={'content-copy'}
            label={'Copy to phone'}
            subLabel={'Item needs to be downloaded for this to become available'} />
        </SettingsGroup>
      </BottomSheet>
    </>
  )
}

export default ItemSettings
