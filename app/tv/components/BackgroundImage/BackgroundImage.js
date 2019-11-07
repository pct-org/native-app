import React, { createRef, useEffect, useState, memo } from 'react'
import { Image, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import usePrevious from 'modules/hooks/usePrevious'

import Overlay from 'components/Overlay'

const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },

})

let backgroundSwitchTimeout = null

export const BackgroundImage = memo(({ uri, withBlur }) => {
  const [currentUri, setCurrentUri] = useState(uri)
  const imageRef = createRef()

  let prevUri = usePrevious(currentUri)

  useEffect(() => {
    if (prevUri !== currentUri) {
      if (imageRef && imageRef.current) {
        imageRef.current[BackgroundImage.ANIMATION](BackgroundImage.ANIMATION_DURATION)
      }
    }

  }, [currentUri])

  useEffect(() => {
    if (currentUri !== uri) {
      if (backgroundSwitchTimeout) {
        clearTimeout(backgroundSwitchTimeout)
      }

      backgroundSwitchTimeout = setTimeout(() => {
        setCurrentUri(uri)

      }, BackgroundImage.ANIMATION_DURATION)
    }

  }, [uri])

  return (
    <React.Fragment>
      {prevUri && (
        <Image
          style={[styles.root, { zIndex: -1 }]}
          source={{
            uri: prevUri,
          }} />
      )}

      <Animatable.Image
        ref={imageRef}
        style={[styles.root, { zIndex: 0 }]}
        animation={BackgroundImage.ANIMATION}
        duration={BackgroundImage.ANIMATION_DURATION}
        source={{
          uri: currentUri,
        }}
        useNativeDriver
        blurRadius={
          withBlur
            ? 1
            : 0
        }
      />

      <Overlay />
    </React.Fragment>
  )
})

BackgroundImage.ANIMATION = 'fadeIn'
BackgroundImage.ANIMATION_DURATION = 310

export default BackgroundImage
