import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import BaseButton from '../BaseButton'
import Typography from '../Typography'
import Overlay from '../Overlay'
import Image from '../Image'
import QualitySelector from '../QualitySelector'

const styles = StyleSheet.create({

  root: {
    width : dimensions.MY_EPISODE_CARD_WIDTH,
    height: dimensions.MY_EPISODE_CARD_HEIGHT,

    borderRadius   : dimensions.BORDER_RADIUS,
    backgroundColor: colors.BACKGROUND_LIGHTER,
    overflow       : 'hidden',
  },

  iconContainer: {
    position: 'absolute',
    height  : '100%',
    width   : '100%',
    opacity : 0.8,
    display : 'flex',

    alignItems    : 'center',
    justifyContent: 'center',
  },

  episodeNumberContainer: {
    position : 'absolute',
    height   : '100%',
    width    : '100%',
    opacity  : 0.8,
    display  : 'flex',
    marginTop: (dimensions.ICON_PLAY_SMALL / 2) + dimensions.UNIT,

    alignItems    : 'center',
    justifyContent: 'center',
  },

  episodeInfoContainer: {
    position: 'absolute',
    bottom  : dimensions.UNIT,
    left    : dimensions.UNIT,
    width   : '90%',
  },

})

export const MyEpisode = ({ item, empty }) => {
  const [showQualitySelector, toggleSelecting] = useState(false)

  const getEpisodeNumber = () => {
    const season = empty ? '00' : `0${item.season}`
    const episode = empty ? '00' : `0${item.number}`

    return `S${season.slice(-2)}E${episode.slice(-2)}`
  }

  return (
    <BaseButton onPress={() => toggleSelecting(!showQualitySelector)}>
      <View style={styles.root}>
        <Image images={
          empty
            ? {}
            : item.images
        } />

        <Overlay />

        <View style={styles.iconContainer}>
          <QualitySelector
            visible={showQualitySelector}
            onRequestClose={() => toggleSelecting(false)}
            iconSize={dimensions.ICON_PLAY_SMALL}
            item={
              empty
                ? {}
                : item
            }
            isMyEpisode
          />
        </View>

        <View style={styles.episodeNumberContainer}>
          <Typography
            fontWeight={'medium'}
            variant={'caption'}>
            {getEpisodeNumber()}
          </Typography>
        </View>

        {!empty && (
          <View style={styles.episodeInfoContainer}>
            <Typography
              textProps={{
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              }}
              fontWeight={'medium'}
              variant={'subheading'}>
              {`${item.show.title}: ${item.title}`}
            </Typography>
          </View>
        )}

      </View>
    </BaseButton>
  )
}

export default MyEpisode
