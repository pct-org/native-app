import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CoverGradient from 'components/CoverGradient'
import BaseButton from 'components/BaseButton'
import Typography from 'components/Typography'
import ScrollViewWithStatusBar from 'screens/Item/ItemScreen'

const { height } = Dimensions.get('window')

const POSTER_WIDTH = dimensions.CARD_MEDIUM_WIDTH - dimensions.UNIT

const styles = StyleSheet.create({

  mainContainer: {
    position: 'relative',
  },

  listContainer: {
    height   : height * 0.45,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
  },

  image: {
    height: '100%',
    width : '100%',
  },

  playContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  playIcon: {
    marginBottom: dimensions.UNIT * 2,
  },

  infoContainer: {
    position     : 'absolute',
    bottom       : 0,
    marginLeft   : dimensions.UNIT * 2,
    marginRight  : dimensions.UNIT * 2,
    width        : '100%',
    display      : 'flex',
    flexDirection: 'row',
  },

  info: {
    position   : 'absolute',
    bottom     : 0,
    left       : POSTER_WIDTH,
    // The * 5 =
    // 2 from main margin container left
    // 1 from of the poster
    // 2 from main margin container right
    width      : dimensions.SCREEN_WIDTH - POSTER_WIDTH - (dimensions.UNIT * 5),
    marginLeft : dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

  genres: {
    marginTop: dimensions.UNIT / 2,
  },

  poster: {
    borderRadius: dimensions.BORDER_RADIUS,
    height      : dimensions.CARD_MEDIUM_HEIGHT - dimensions.UNIT,
    width       : POSTER_WIDTH,
  },

  summary: {
    marginLeft  : dimensions.UNIT * 2,
    marginTop   : dimensions.UNIT * 2,
    marginRight : dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
  },
})

export const Cover = ({ item, onOpen, onLoad }) => {
  if (!item) {
    return null
  }

  const genres = [...item.genres].splice(0, 3)

  return (
    <React.Fragment>

      <View style={styles.mainContainer}>
        <BaseButton onPress={() => console.log('play')}>
          <View style={styles.listContainer}>

            <Image
              style={styles.image}
              source={{ uri: item.images.fanart.high }}
              onLoad={onLoad}
              onError={onLoad}
            />

            <CoverGradient start={{ x: 0, y: 0.1 }} />

            <View style={styles.playContainer}>
              <Icon
                style={styles.playIcon}
                name={'play-circle-outline'}
                color={colors.ICON_COLOR}
                size={dimensions.ICON_PLAY_MEDIUM} />
            </View>

          </View>
        </BaseButton>

        <View style={styles.infoContainer}>
          <Image
            style={styles.poster}
            source={{ uri: item.images.poster.thumb }}
            onLoad={onLoad}
            onError={onLoad}
          />

          <View style={styles.info}>
            <Typography
              variant={'display5'}
              textProps={{
                width        : '100%',
                numberOfLines: 2,
                ellipsizeMode: 'tail',
              }}>
              {item.title}
            </Typography>

            <Typography
              style={styles.genres}
              variant={'caption'}
              emphasis={'medium'}>
              {genres.join(' - ')}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.summary}>
        <Typography variant={'body2'}>
          {item.summary}
        </Typography>
      </View>

    </React.Fragment>
  )
}

Cover.propTypes = {
  item  : PropTypes.object,
  onPlay: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
}

Cover.defaultProps = {
  item  : null,
  onLoad: null,
}

export default Cover
