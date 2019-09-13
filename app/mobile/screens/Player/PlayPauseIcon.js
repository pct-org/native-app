import React from 'react'
import { Dimensions } from 'react-native'
import { View } from 'react-native'

import IconButton from 'components/IconButton'

const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

const ICON_SIZE = 76

export default class PlayPauseIcon extends React.Component {

  getPositionStyle = () => {
    const { isPortrait } = this.props

    if (isPortrait) {
      return {
        left: (windowWidth - ICON_SIZE) / 2,
        top : (windowHeight - ICON_SIZE) / 2,
      }
    }

    return {
      left: (windowHeight - ICON_SIZE + 55) / 2,
      top : (windowWidth - ICON_SIZE) / 2,
    }
  }

  render() {
    const { paused, handlePauseVideo, handlePlayVideo } = this.props

    return (
      <View
        style={{
          position: 'absolute',
          width   : ICON_SIZE,
          height  : ICON_SIZE,
          zIndex  : 2000,
          ...this.getPositionStyle(),
        }}
        pointerEvents={'box-none'}>

        {!paused && (
          <IconButton
            onPress={handlePauseVideo}
            name={'pause'}
            color={'#FFF'}
            size={60} />
        )}

        {paused && (
          <IconButton
            onPress={handlePlayVideo}
            name={'play'}
            color={'#FFF'}
            size={60} />
        )}
      </View>
    )
  }
}
