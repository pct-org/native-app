import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'

import Card from 'components/Card'
import Typography from 'components/Typography'

export const styles = {
  root: {
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

export const EpisodePlaying = ({ item }) => (
  <View style={styles.root}>
    <Card
      size={'small'}
      elevation={0}
      item={
        item.type === 'episode'
          ? item.show
          : item
      } />

    <View style={styles.container}>
      <Typography
        emphasis={'high'}
        color={'white'}
        variant={'subtitle2'}>
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
          variant={'overline'}>
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

export default EpisodePlaying
