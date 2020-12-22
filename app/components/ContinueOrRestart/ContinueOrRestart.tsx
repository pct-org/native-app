import React from 'react'
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Overlay from '../Overlay'
import TextButton from '../TextButton'
import Typography from '../Typography'
import IconButton from '../IconButton'
import Remote from '../../tv/modules/Controls/Remote'

export const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT,
    zIndex: 2500,

    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  info: {
    textAlign: 'center',
    width: '40%'
  },

  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2501,
    marginTop: dimensions.UNIT
  },

  action: {
    marginHorizontal: dimensions.UNIT,
    zIndex: 2502
  }

})

export interface Props {

  pauseVideo: () => void

  handleContinueVideo: () => void

  handleRestartVideo: () => void

}

export const ContinueOrRestart: React.FC<Props> = ({
  pauseVideo,
  handleContinueVideo,
  handleRestartVideo
}) => {
  const [showedOverlay, setOverlayVisible] = React.useState(true)

  React.useEffect(() => {
    pauseVideo()
  }, [])

  const handleContinue = () => {
    handleContinueVideo()
    setOverlayVisible(false)
  }

  const handleRestart = () => {
    handleRestartVideo()
    setOverlayVisible(false)
  }

  if (!showedOverlay) {
    return null
  }

  return (
    <View style={styles.container}>
      <Overlay />

      <Typography
        style={styles.info}
        variant={'subtitle1'}>
        {i18n.t('You already started watching this video, what do you want to do?')}
      </Typography>

      <View style={styles.actions}>
        <TextButton
          style={styles.action}
          onPress={handleRestart}>
          {i18n.t('Restart')}
        </TextButton>

        <TextButton
          style={styles.action}
          onPress={handleContinue}
          hasTVPreferredFocus>
          {i18n.t('Continue')}
        </TextButton>
      </View>

    </View>
  )
}

export default ContinueOrRestart
