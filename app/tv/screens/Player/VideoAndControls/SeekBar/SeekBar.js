import React, { useState } from 'react'
import { View } from 'react-native'
import Slider from '@react-native-community/slider'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'

import { ICON_SIZE } from '../PlayPauseIcon/PlayPauseIcon'

const styles = {

  container: {
    // position: 'absolute',
    // bottom: dimensions.ICON_SIZE_DEFAULT + dimensions.UNIT * 4,
    // left: (dimensions.UNIT * 4) + ICON_SIZE,
    zIndex: 2000,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  slider: {
    width: dimensions.SCREEN_WIDTH - dimensions.UNIT * 28,
  },

  track: {
    height: 2,
    borderRadius: 1,
  },

  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_COLOR_200,
  },

  timeContainer: {
    alignItems: 'center',
    width: dimensions.UNIT * 5,
  },

  time: {},
}

const SeekBar = ({
  duration,
  currentTime,
  onSeek,
}) => {
  const [isSeekingPreviousValue, setSeeking] = useState(null)

  const handleSlidingCompleted = (slideTo) => {
    onSeek(slideTo)

    setSeeking(null)
  }

  const handleOnSliding = () => {
    setSeeking(currentTime)
  }

  const formatTime = (ms) => {
    let seconds = ms / 1000
    let minutes = seconds / 60
    let hours = minutes / 60

    if (hours > 0) {
      hours = parseInt(hours, 10)
      minutes -= hours * 60
    }

    if (minutes > 0) {
      minutes = parseInt(minutes, 10)
      seconds -= minutes * 60

      minutes = `0${minutes}`.substr(-2)

    } else {
      minutes = `00`
    }

    if (seconds > 0) {
      seconds = parseInt(seconds, 10)

      seconds = `0${seconds}`.substr(-2)

    } else {
      seconds = `00`
    }

    if (hours > 0 && minutes > 0) {
      return `${hours}:${minutes}:${seconds}`

    } else {
      return `${minutes}:${seconds}`
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Typography
          style={styles.time}
          variant={'captionSmall'}>
          {formatTime(currentTime)}
        </Typography>
      </View>

      <Slider
        style={styles.slider}
        maximumValue={Math.max(duration, 1, currentTime + 1)}
        onSlidingStart={handleOnSliding}
        onSlidingComplete={handleSlidingCompleted}
        value={isSeekingPreviousValue || currentTime}
        minimumTrackTintColor={colors.PRIMARY_COLOR_200}
        maximumTrackTintColor={colors.BACKGROUND_SNACKBAR}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        disabled
      />

      <View style={styles.timeContainer}>
        <Typography
          style={styles.time}
          variant={'captionSmall'}>
          {formatTime(duration - currentTime)}
        </Typography>
      </View>
    </View>
  )
}

export default SeekBar
