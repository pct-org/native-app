import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'

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

export const PlayingItemInfo = ({ item }) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Typography
          emphasis={'high'}
          color={'white'}
          variant={'headline6'}>
          {
            item.type === 'episode'
              ? item.show.title
              : item.title
          }
        </Typography>

        {item.type === 'episode' && (
          <Typography
            emphasis={'high'}
            color={'white'}
            variant={'subtitle1'}>
            {`${item.number}. ${item.title}`}
          </Typography>
        )}

        {item.type === 'episode' && (
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
}

export default PlayingItemInfo
