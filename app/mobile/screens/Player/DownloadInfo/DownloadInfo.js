import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'

export const styles = {
  root: {
    position: 'absolute',
    top: dimensions.UNIT * 3,
    right: dimensions.UNIT * 4,
    zIndex: 1000,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },

  container: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT,
  },

  synopsis: {
    marginTop: dimensions.UNIT / 2,
  },

  text: {
    textAlign: 'right',
  },
}

export const DownloadInfo = ({ status, progress, speed, timeRemaining, numPeers }) => (
  <View style={styles.root}>
    <View style={styles.container}>
      <Typography
        style={styles.text}
        emphasis={'high'}
        color={'white'}
        variant={'caption'}>
        {status}
      </Typography>

      {status !== 'complete' && (
        <React.Fragment>
          <Typography
            style={styles.text}
            emphasis={'medium'}
            color={'white'}
            variant={'caption'}>
            {`${progress}% / ${speed}`}
          </Typography>

          <Typography
            style={styles.text}
            emphasis={'medium'}
            color={'white'}
            variant={'caption'}>
            {timeRemaining}
          </Typography>

          <Typography
            style={styles.text}
            emphasis={'medium'}
            color={'white'}
            variant={'caption'}>
            {numPeers}
          </Typography>
        </React.Fragment>
      )}
    </View>
  </View>
)

export default DownloadInfo