import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Icon from 'components/Icon'
import CoverGradient from 'components/CoverGradient'
import BaseButton from 'components/BaseButton'
import Typography from 'components/Typography'
import Image from 'components/Image'
import Card from 'components/Card'
import QualitySelector from 'mobile/components/QualitySelector'

const styles = StyleSheet.create({

  mainContainer: {
    position: 'relative',
    height: dimensions.getHeight(281),
  },

  backgroundContainer: {
    height: dimensions.getHeight(201),
    width: '100%',
    alignSelf: 'stretch',
    position: 'relative',
    display: 'flex',
  },

  image: {
    height: '100%',
    width: '100%',
  },

  playContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContainer: {
    position: 'absolute',
    bottom: 0,
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  info: {
    position: 'absolute',
    bottom: 0,
    left: dimensions.CARD_WIDTH + dimensions.UNIT,
    // The * 5 =
    // 2 from main margin container left
    // 1 from of the poster
    // 2 from main margin container right
    width: dimensions.SCREEN_WIDTH - dimensions.CARD_WIDTH - (dimensions.UNIT * 5),
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT,
  },

  genres: {
    marginTop: dimensions.UNIT / 2,
  },

  poster: {
    position: 'absolute',
    bottom: -dimensions.UNIT,
    left: 0,
  },

  likedContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  likedIcon: {
    marginRight: dimensions.UNIT,
  },

  title: {
    marginBottom: dimensions.UNIT,
  },
})

export const MainCover = ({ empty, item, handleItemOpen }) => {
  const [showQualitySelector, toggleSelecting] = useState(false)
  const genres = empty ? [] : item.genres ? [...item.genres].splice(0, 3) : []

  return (
    <View style={styles.mainContainer}>
      <BaseButton onPress={() => {
        if (item && item.type === constants.TYPE_MOVIE) {
          toggleSelecting(!showQualitySelector)
        }
      }}>
        <View style={styles.backgroundContainer}>

          <Image
            resizeMode={'cover'}
            withFallback={false}
            style={styles.image}
            images={
              empty
                ? {}
                : item.images
            }
            type={'backdrop'}
            size={'high'}
          />

          <CoverGradient start={{ x: 0, y: 0.1 }} />

          {!empty && item.type === constants.TYPE_MOVIE && (
            <Animatable.View
              animation={'fadeIn'}
              style={styles.playContainer}
              useNativeDriver>

              <QualitySelector
                item={item}
                visible={showQualitySelector}
                onRequestClose={() => toggleSelecting(false)} />

            </Animatable.View>
          )}

        </View>
      </BaseButton>

      <View style={styles.infoContainer}>
        <Card
          style={styles.poster}
          empty={empty}
          item={item}
          onPress={() => {
            if (!empty && handleItemOpen) {
              handleItemOpen(item)
            }
          }}
        />

        {!empty && (
          <Animatable.View
            animation={'fadeIn'}
            style={styles.info}
            useNativeDriver>
            <Typography
              style={styles.title}
              variant={'headline5'}
              textProps={{
                width: '100%',
                numberOfLines: 4,
                ellipsizeMode: 'tail',
              }}>
              {empty ? '' : item.title}
            </Typography>

            <View style={styles.likedContainer}>
              <Icon
                style={styles.likedIcon}
                name={'heart'}
                color={'01dp'}
                size={dimensions.ICON_SIZE_DEFAULT} />

              <Typography
                style={styles.genres}
                variant={'caption'}
                emphasis={'medium'}>
                {empty ? '' : `${item.rating.percentage}%`}
              </Typography>
            </View>

            <Typography
              style={styles.genres}
              variant={'caption'}
              emphasis={'medium'}>
              {genres.join(' - ')}
            </Typography>
          </Animatable.View>
        )}
      </View>
    </View>
  )
}

MainCover.propTypes = {
  loading: PropTypes.bool,
  item: PropTypes.object,
}

MainCover.defaultProps = {
  loading: false,
  item: null,
}

export default MainCover
