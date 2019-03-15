import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CoverGradient from 'components/CoverGradient'
import BaseButton from 'components/BaseButton'
import Typography from 'components/Typography'
import Image from 'components/Image'

const styles = StyleSheet.create({

  mainContainer: {
    position: 'relative',
  },

  listContainer: {
    height   : dimensions.SCREEN_HEIGHT * 0.45,
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
    left       : dimensions.CARD_SMALL_WIDTH,
    // The * 5 =
    // 2 from main margin container left
    // 1 from of the poster
    // 2 from main margin container right
    width      : dimensions.SCREEN_WIDTH - dimensions.CARD_SMALL_WIDTH - (dimensions.UNIT * 5),
    marginLeft : dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

  genres: {
    marginTop: dimensions.UNIT / 2,
  },

  posterContainer: {
    height: dimensions.CARD_SMALL_HEIGHT,
    width : dimensions.CARD_SMALL_WIDTH,

    borderRadius: dimensions.BORDER_RADIUS,
    overflow    : 'hidden',
  },

  poster: {
    backgroundColor: colors.BACKGROUND_LIGHTER,

    width : '100%',
    height: '100%',
  },

  summary: {
    margin: dimensions.UNIT * 2,
  },
})

export const BasicInfo = ({ item, onOpen }) => {
  const genres = !item ? [] : item.genres ? [...item.genres].splice(0, 3) : []

  return (
    <React.Fragment>

      <View style={styles.mainContainer}>
        <BaseButton onPress={() => {
          if (item && item.type === Constants.TYPE_MOVIE) {
            onOpen()
          }
        }}>
          <View style={styles.listContainer}>

            <Image
              withFallback={false}
              style={styles.image}
              images={
                !item
                  ? {}
                  : item.images
              }
              type={'fanart'}
              size={'high'}
            />

            <CoverGradient start={{ x: 0, y: 0.1 }} />

            {item && item.type === Constants.TYPE_MOVIE && (
              <Animatable.View
                animation={'fadeIn'}
                style={styles.playContainer}
                useNativeDriver>
                <Icon
                  style={styles.playIcon}
                  name={'play-circle-outline'}
                  color={colors.ICON_COLOR}
                  size={dimensions.ICON_PLAY_MEDIUM} />
              </Animatable.View>
            )}

          </View>
        </BaseButton>

        <View style={styles.infoContainer}>
          <View style={styles.posterContainer}>
            <Image
              style={styles.poster}
              images={
                !item
                  ? {}
                  : item.images
              }
            />
          </View>

          <View style={styles.info}>
            <Typography
              variant={'display5'}
              textProps={{
                width        : '100%',
                numberOfLines: 2,
                ellipsizeMode: 'tail',
              }}>
              {item ? item.title : ''}
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

      {item && (
        <Animatable.View
          style={styles.summary}
          animation={'fadeIn'}
          useNativeDriver>
          <Typography variant={'body2'}>
            {item.summary}
          </Typography>
        </Animatable.View>
      )}

    </React.Fragment>
  )
}

BasicInfo.propTypes = {
  item  : PropTypes.object,
  onPlay: PropTypes.func.isRequired,
}

BasicInfo.defaultProps = {
  item: null,
}

export default BasicInfo
