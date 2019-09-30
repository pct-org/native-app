import dimensions from 'modules/dimensions'
import React from 'react'
import { View } from 'react-native'

import EpisodePlaying from 'components/EpisodePlaying'
import Typography from 'components/Typography'

export const styles = {
  root: {
    position: 'absolute',
    top: dimensions.UNIT * 3,
    left: dimensions.UNIT * 4,
    zIndex: 1000,
  },
}

export const PlayingItemInfo = ({ item }) => {
  return (
    <View style={styles.root}>
      <EpisodePlaying item={item} />
    </View>
  )
}

export default PlayingItemInfo
