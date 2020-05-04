import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import i18n from 'modules/i18n'

import Typography from 'components/Typography'

const styles = {

  root: {
    marginBottom: dimensions.UNIT * 4,
    height: 2,
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

}

export const WatchedBar = ({ item }) => {
  const watchedPercentage = item?.watched?.progress ?? 0

  if (watchedPercentage === 0) {
    return null
  }

  return (
    <View style={styles.root}>
      <View style={{
        ...styles.progressBar,
        width: `${watchedPercentage}%`,
      }} />

      {(watchedPercentage < 100) && (
        <View style={{
          ...styles.container,
          width: `${watchedPercentage}%`,
        }}>
          <Typography variant={'captionSmall'}>
            {i18n.t('Watched: {{percentage}}%', { percentage: watchedPercentage })}
          </Typography>
        </View>
      )}
    </View>
  )
}

WatchedBar.propTypes = {}

WatchedBar.defaultProps = {}

export default WatchedBar
