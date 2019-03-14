import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CoverGradient from '../CoverGradient'
import BaseButton from '../BaseButton'
import Typography from '../Typography'
import IconButton from '../IconButton'
import Image from '../Image'

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

  playContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  info: {
    position  : 'absolute',
    bottom    : 0,
    marginLeft: dimensions.UNIT * 2,
  },

  genres: {
    marginTop   : dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT / 2,
  },

  infoContainer: {
    display      : 'flex',
    flexDirection: 'row',

    marginTop   : dimensions.UNIT / 2,
    marginLeft  : dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
  },

})

export const MainCover = ({ item, empty, onOpen }) => {
  const genres = empty ? [] : [...item.genres].splice(0, 4)

  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        <BaseButton onPress={() => console.log('play')}>
          <View style={styles.listContainer}>

            <Image
              images={
                empty
                  ? {}
                  : item.images
              }
              type={'fanart'}
              size={'high'} />

            <CoverGradient start={{ x: 0, y: 0.1 }} />

            {!empty && item.type === Constants.TYPE_MOVIE && (
              <Animatable.View
                animation={'fadeIn'}
                style={styles.playContainer}
                useNativeDriver>
                <Icon
                  name={'play-circle-outline'}
                  color={colors.ICON_COLOR}
                  size={dimensions.ICON_PLAY_MEDIUM} />
              </Animatable.View>
            )}

          </View>
        </BaseButton>

        <View style={styles.info}>
          <Typography variant={'display4'}>
            {empty ? '' : item.title}
          </Typography>

          <Typography
            style={styles.genres}
            variant={'caption'}
            emphasis={'medium'}>
            {genres.join(' - ')}
          </Typography>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Typography
          style={{
            width : onOpen
              ? '85%'
              : '100%',
            height: 45, // 3 times the line height of body2
          }}
          variant={'body2'}
          textProps={{
            numberOfLines: 3,
            ellipsizeMode: 'tail',
          }}>
          {empty ? '' : item.summary}
        </Typography>

        {item && (
          <Animatable.View
            animation={'fadeIn'}
            useNativeDriver>
            <IconButton
              onPress={() => onOpen(item)}
              name={'information-outline'}
              color={colors.ICON_COLOR}
              size={35} />
          </Animatable.View>
        )}
      </View>
    </React.Fragment>
  )
}

MainCover.propTypes = {
  item  : PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
}

MainCover.defaultProps = {
  item  : null,
  onLoad: null,
}

export default MainCover
