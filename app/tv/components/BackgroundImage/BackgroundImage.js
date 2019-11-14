import React, { createRef, useEffect, useState, memo } from 'react'
import { Image, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
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

export const BackgroundImage = memo(({ uri, withBlur, trailerID }) => {
  const [currentUri, setCurrentUri] = useState(uri)
  const imageRef = createRef()
  console.log(trailerID)
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

      {trailerID && (
        <Animatable.View
          style={{
            ...StyleSheet.absoluteFillObject,
            top: 0,
            zIndex: 1,
          }}
          animation={BackgroundImage.ANIMATION}
          duration={BackgroundImage.ANIMATION_DURATION}
          useNativeDriver
        >
          {/*<WebView*/}
          {/*  ref={(ref) => { this.videoPlayer = ref}}*/}
          {/*  scalesPageToFit={true}*/}
          {/*  style={StyleSheet.absoluteFill}*/}
          {/*  source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + trailerID + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>' }}*/}
          {/*  // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS*/}
          {/*  // onNavigationStateChange ={this.onShouldStartLoadWithRequest} //for Android*/}
          {/*/>*/}
        </Animatable.View>
      )}

      <Overlay />
    </React.Fragment>
  )
})

BackgroundImage.ANIMATION = 'fadeIn'
BackgroundImage.ANIMATION_DURATION = 310

export default BackgroundImage
