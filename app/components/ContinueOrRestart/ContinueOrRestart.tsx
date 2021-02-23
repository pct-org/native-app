import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { useTvRemoteProvider } from 'tv/modules/Controls/TvRemoteProvider'

import Overlay from '../Overlay'
import TextButton from '../TextButton'
import Typography from '../Typography'

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

  continueVideo: () => void

  restartVideo: () => void

  disableControls: () => void

  enableControls: () => void

}

export const ContinueOrRestart: React.FC<Props> = ({
  pauseVideo,
  continueVideo,
  restartVideo,
  disableControls,
  enableControls
}) => {
  const [showedOverlay, setOverlayVisible] = React.useState(true)
  const tvRemote = useTvRemoteProvider()

  React.useEffect(() => {
    pauseVideo()
    disableControls()
  }, [])

  const handleContinue = () => {
    continueVideo()
    enableControls()
    setOverlayVisible(false)
  }

  const handleRestart = () => {
    restartVideo()
    enableControls()
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
          innerRef={tvRemote.addRef('restart-video')}
          onFocus={tvRemote.onFocus('restart-video', {
            elementTop: 'restart-video',
            elementLeft: 'continue-video',
            elementRight: 'continue-video',
            elementBottom: 'restart-video'
          })}
          style={styles.action}
          onPress={handleRestart}>
          {i18n.t('Restart')}
        </TextButton>

        <TextButton
          innerRef={tvRemote.addRef('continue-video')}
          onFocus={tvRemote.onFocus('continue-video', {
            elementTop: 'continue-video',
            elementLeft: 'restart-video',
            elementRight: 'restart-video',
            elementBottom: 'continue-video'
          })}
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
