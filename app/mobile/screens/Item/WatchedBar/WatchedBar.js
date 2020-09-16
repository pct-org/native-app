import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import colors from 'modules/colors'
import i18n from 'modules/i18n'

import Typography from 'components/Typography'

const styles = {

  root: {
    marginBottom: dimensions.UNIT * 4,
    height: dimensions.getHeight(3),
  },

  progressBar: {
    backgroundColor: colors.PRIMARY_COLOR_200,
    width: 0,
    height: 2,
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
  },
}

export const WatchedBar = ({ item }) => {
  const watchedPercentage = item?.watched?.progress ?? 0

  if (watchedPercentage === 0) {
    return null
  }

  return (
    <View style={styles.root}>
      <Animatable.View
        duration={constants.ANIMATION_DURATIONS.enteringScreen}
        animation={'fadeIn'}
        style={{
          ...styles.progressBar,
          width: `${watchedPercentage}%`,
        }}
        useNativeDriver
      />

      {(watchedPercentage < 100) && (
        <View
          style={{
            ...styles.container,
            width: `${watchedPercentage}%`,
          }}>
          {watchedPercentage >= 15 && (
            <Typography
              style={styles.text}
              variant={'captionSmall'}>
              {i18n.t('Watched: {{percentage}}%', { percentage: watchedPercentage })}
            </Typography>
          )}
        </View>
      )}
    </View>
  )
}

WatchedBar.propTypes = {
  item: PropTypes.object.isRequired
}

export default WatchedBar
