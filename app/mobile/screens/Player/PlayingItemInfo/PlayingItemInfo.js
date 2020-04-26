import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import Card from 'components/Card'

export const styles = {
  root: {
    position: 'absolute',
    top: dimensions.UNIT * 3,
    left: dimensions.UNIT * 4,
    zIndex: 1000,

    display: 'flex',
    flexDirection: 'row',
    maxWidth: '55%',
  },

  container: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT,
  },

  synopsis: {
    marginTop: dimensions.UNIT / 2,
  },
}

export const PlayingItemInfo = ({ item }) => (
  <View style={styles.root}>
    <Card
      elevation={0}
      item={
        item.type === constants.TYPE_EPISODE
          ? item.show
          : item
      }
    />

    <View style={styles.container}>
      <Typography
        emphasis={'high'}
        color={'white'}
        variant={'headline6'}>
        {
          item.type === constants.TYPE_EPISODE
            ? item.show.title
            : item.title
        }
      </Typography>

      {item.type === constants.TYPE_EPISODE && (
        <Typography
          emphasis={'high'}
          color={'white'}
          variant={'subtitle1'}>
          {`${item.number}. ${item.title}`}
        </Typography>
      )}

      {item.type === constants.TYPE_MOVIE && (
        <Typography
          emphasis={'high'}
          color={'white'}
          variant={'subtitle1'}>
          {item.description}
        </Typography>
      )}

      {item.type === constants.TYPE_EPISODE && (
        <Typography
          style={styles.synopsis}
          emphasis={'medium'}
          color={'white'}
          variant={'caption'}>
          {item.synopsis}
        </Typography>
      )}
    </View>
  </View>
)

export default PlayingItemInfo
