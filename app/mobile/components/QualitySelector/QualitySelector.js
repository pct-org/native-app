import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ToastAndroid } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'
import { withNavigation } from 'react-navigation'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Icon from 'components/Icon'
import Typography from 'components/Typography'
import Modal from 'components/Modal'

import colors from 'modules/colors'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  listContainer: {
    opacity: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
  },

  closeIcon: {
    position: 'absolute',
    top: 34,
    right: 14,
  },

  qualityContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  quality: {
    ...material.titleWhiteObject,
    padding: 8,
  },

  qualitySize: {
    ...material.captionWhiteObject,
  },

})

export const QualitySelector = ({ variant, itemType, visible, playItem, onRequestClose, style, item, navigation }) => {
  const handlePlayTorrent = (torrent) => {
    const { navigate } = navigation

    // Close the selector
    onRequestClose()

    if (playItem) {
      playItem(item, torrent.quality)

    } else {
      navigate(
        'Player',
        {
          playQuality: torrent.quality,
          item,
        },
      )
    }
  }

  const handleDownloadTorrent = (torrent) => {
    // Close the selector
    onRequestClose()

    // TODO:: Start download mutation
  }

  return (
    <React.Fragment>

      <Icon
        style={style}
        name={'play-circle-outline'}
        size={itemType === 'my-episode'
          ? 30
          : 45
        } />

      {/*<Modal*/}
      {/*  onRequestClose={onRequestClose}*/}
      {/*  visible={visible}>*/}

      {/*  {(!item || !item.torrents || item.torrents.length === 0) && (*/}
      {/*    <Typography variant={'title'}>*/}
      {/*      {i18n.t('No qualities available!')}*/}
      {/*    </Typography>*/}
      {/*  )}*/}

      {/*  {item && item.torrents && item.torrents.map((torrent) => (*/}
      {/*    <Animatable.View*/}
      {/*      key={torrent.quality}*/}
      {/*      animation={'fadeIn'}*/}
      {/*      duration={200}*/}
      {/*      useNativeDriver>*/}
      {/*      <BaseButton onPress={() => handlePlayTorrent(torrent)}>*/}
      {/*        <Text style={styles.quality}>*/}
      {/*          {torrent.quality} <Text style={styles.qualitySize}>({torrent.sizeString})</Text>*/}
      {/*        </Text>*/}
      {/*      </BaseButton>*/}
      {/*    </Animatable.View>*/}
      {/*  ))}*/}

      {/*</Modal>*/}

    </React.Fragment>
  )
}


QualitySelector.propTypes = {
  style: PropTypes.object,
  fetchingBetter: PropTypes.bool,
  variant: PropTypes.oneOf(['play', 'download']),
}

QualitySelector.defaultProps = {
  style: {},
  variant: 'play',
}

export default withNavigation(QualitySelector)
