import React, { useState, createRef, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

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
  }

})

export const BackgroundImage = ({ uri }) => {
  const [prevUri, setPrevUri] = useState(null)
  const imageRef = createRef()

  useEffect(() => {
    if (!prevUri || prevUri !== uri) {
      setPrevUri(uri)

      if (imageRef && imageRef.current) {
        imageRef.current[BackgroundImage.ANIMATION](BackgroundImage.ANIMATION_DURATION)
      }
    }
  }, [uri])

  return (
    <React.Fragment>
      {prevUri && (
        <Image
          style={styles.root}
          source={{
            uri: prevUri,
          }} />
      )}

      <Animatable.Image
        ref={imageRef}
        style={styles.root}
        animation={BackgroundImage.ANIMATION}
        duration={BackgroundImage.ANIMATION_DURATION}
        source={{
          uri,
        }}
        useNativeDriver
      />

      <Overlay  />
    </React.Fragment>
  )
}

BackgroundImage.ANIMATION = 'fadeIn'
BackgroundImage.ANIMATION_DURATION = 310

export default BackgroundImage
