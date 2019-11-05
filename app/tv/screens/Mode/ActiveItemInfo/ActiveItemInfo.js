import Icon from 'components/Icon/Icon'
import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'

const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: dimensions.getTop(80),
    left: dimensions.TV_LEFT,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  likedIcon: {
    marginRight: dimensions.UNIT / 2,
  },

  likedPercentage: {
    marginRight: dimensions.UNIT,
  },

  title: {},

})

export const ActiveItemInfo = memo(({ title, rating, genres: genresProp }) => {
  const genres = genresProp ? [...genresProp].splice(0, 3) : []

  return (
    <Animatable.View
      animation={'fadeIn'}
      style={styles.root}
      useNativeDriver>
      <Typography
        style={styles.title}
        variant={'headline5'}
        fontWeight={'medium'}
        textProps={{
          width: '100%',
          numberOfLines: 1,
          ellipsizeMode: 'tail',
        }}>
        {title}
      </Typography>

      <View style={styles.container}>
        <Icon
          style={styles.likedIcon}
          name={'heart'}
          color={'01dp'}
          size={dimensions.ICON_SIZE_DEFAULT} />

        <Typography
          style={styles.likedPercentage}
          variant={'caption'}
          emphasis={'medium'}>
          {`${rating.percentage}%`}
        </Typography>

        <Typography
          variant={'caption'}
          emphasis={'medium'}>
          {genres.join(' - ')}
        </Typography>
      </View>
    </Animatable.View>
  )
})

export default ActiveItemInfo
