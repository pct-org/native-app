import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'
import * as Animatable from 'react-native-animatable'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import withFocusManager from 'tv/modules/FocusManager/withFocusManager'

import CoverGradient from '../CoverGradient'
import Button from '../Button'
import Typography from '../Typography'
import IconButton from '../IconButton'
import Image from '../Image'
import Overlay from '../Overlay'

const styles = StyleSheet.create({

  root: {
    height: dimensions.SCREEN_HEIGHT,
    width: dimensions.SCREEN_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.SCREEN_HEIGHT * 0.8,
    width: dimensions.SCREEN_WIDTH * 0.5,
  },

  cover: {
    height: dimensions.CARD_LARGE_HEIGHT,
    width: dimensions.CARD_LARGE_WIDTH,
    borderWidth: dimensions.BORDER_WIDTH,
    borderRadius: dimensions.BORDER_RADIUS,
  },

  info: {
    position: 'relative',
    marginLeft: dimensions.UNIT * 4,
    minWidth: dimensions.SCREEN_WIDTH * 0.5,
  },

  title: {
    height: 60,
  },

  summary: {
    height: 60,
    // marginTop: dimensions.UNIT,
    // marginBottom: dimensions.UNIT,
  },

  genres: {
    height: 30,
    marginTop: dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT,
  },
})

export const MainCover = ({ item, empty,focusManager }) => {
  const [showQualitySelector, toggleSelecting] = useState(false)

  const genres = empty ? [] : [...item.genres].splice(0, 4)

  return (
    <View style={styles.root}>
      <Image
        style={{
          position: 'absolute',
          width: dimensions.SCREEN_WIDTH,
          height: dimensions.SCREEN_HEIGHT,
          top: 0,
          bottom: 0,
        }}
        images={empty ? {} : item.images}
        empty={empty}
        type={'fanart'}
        size={'full'}
      />

      <Overlay variant={'dark'} />

      <View style={styles.container}>
        <Image
          resizeMode={'cover'}
          images={empty ? {} : item.images}
          empty={empty}
          type={'poster'}
          size={'high'}
          style={styles.cover}
        />

        {empty && (
          <View style={styles.info} />
        )}

        {!empty && (
          <Animatable.View
            style={styles.info}
            animation={'fadeIn'}
            useNativeDriver>
            <Typography
              style={styles.title}
              variant={'display3'}>
              {item.title}
            </Typography>

            <Typography
              style={styles.summary}
              variant={'body2'}
              textProps={{
                numberOfLines: 4,
                ellipsizeMode: 'tail',
              }}>
              {item.summary}
            </Typography>

            <Typography
              style={styles.genres}
              variant={'caption'}
              emphasis={'medium'}>
              {genres.join(' - ')}
            </Typography>

            <View
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Button
                innerRef={ref => focusManager.addRef('btn-main-cover-play', ref)}
                onPress={() => {}}
                variant={'primary'}>
                PLAY
              </Button>

              <IconButton
                style={{ marginLeft: 20 }}
                onPress={() => {}}
                name={'plus'}
                color={colors.ICON_COLOR}
                size={35} />
            </View>
          </Animatable.View>
        )}
      </View>
    </View>
  )
}

MainCover.propTypes = {
  item: PropTypes.object,
  onLoad: PropTypes.func,
}

MainCover.defaultProps = {
  item: null,
  onLoad: null,
}

export default withFocusManager(MainCover)
