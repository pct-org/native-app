import Card from 'components/Card/Card'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'
import { withNavigation } from 'react-navigation'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Icon from 'components/Icon'
import Typography from 'components/Typography'
import Modal from 'components/Modal'
import TextButton from 'components/TextButton'

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

  itemContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: dimensions.UNIT * 9,
    paddingLeft: dimensions.UNIT * 2,
    paddingRight: dimensions.UNIT * 2,
  },

  title: {
    marginTop: dimensions.UNIT * 3,
    textAlign: 'center'
  },

  container: {
    position: 'absolute',
    top: (dimensions.SCREEN_HEIGHT / 2) + dimensions.UNIT * 3,
    display: 'flex',
    alignItems: 'center',
  },

  qualitiesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: dimensions.UNIT * 2,
  },

  quality: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qualitySize: {},

})

export const QualitySelector = ({ itemType, variant, visible, playItem, onRequestClose, style, item, navigation }) => {
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

      <Modal
        onRequestClose={onRequestClose}
        visible={visible}>

        {item && item.title && (
          <Animatable.View
            style={styles.itemContainer}
            animation={'fadeIn'}
            duration={200}
            useNativeDriver>
            <Card
              item={
                item.type === 'movie'
                  ? item
                  : item.show
              }
              onPress={null}
            />

            <Typography
              style={styles.title}
              variant={'headline5'}>
              {item.type === 'movie'
                ? item.title
                : `${item.show.title}: ${item.title}`
              }
            </Typography>

          </Animatable.View>
        )}

        <Animatable.View
          animation={'fadeIn'}
          duration={200}
          style={styles.container}
          useNativeDriver>
          <Typography variant={'subtitle1'}>
            {i18n.t(variant === 'play'
              ? 'Watch in'
              : 'Download in'
            )}
          </Typography>

          <View style={styles.qualitiesContainer}>
            {item && item.torrents && item.torrents.map((torrent) => (
              <View
                key={torrent.quality}

                style={styles.quality}>
                <TextButton
                  color={'primary'}
                  onPress={() => handlePlayTorrent(torrent)}>
                  {torrent.quality}
                </TextButton>

                <Typography
                  variant={'caption'}
                  emphasis={'medium'}>
                  {torrent.sizeString}
                </Typography>
              </View>
            ))}
          </View>
        </Animatable.View>

      </Modal>

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
