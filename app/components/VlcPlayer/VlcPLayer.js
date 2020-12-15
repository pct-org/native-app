import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, requireNativeComponent, NativeModules, StatusBar } from 'react-native'

export const styles = {

  base: {
    overflow: 'hidden',
  },

}

export default class VlcPLayer extends React.Component {

  componentWillUnmount() {
    StatusBar.setHidden(false)
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  seek(pos) {
    this.setNativeProps({ seek: pos })
  }

  presentFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: true })
  }

  dismissFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: false })
  }

  assignRoot = (component) => {
    this._root = component
  }

  handleOnProgress = (event) => {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent)
    }
  }

  handleOnPaused = (event) => {
    StatusBar.setHidden(false)

    if (this.props.onPaused) {
      this.props.onPaused(event.nativeEvent)
    }
  }

  handleOnPlaying = (event) => {
    StatusBar.setHidden(true)

    if (this.props.onPlaying) {
      this.props.onPlaying(event.nativeEvent)
    }
  }

  getViewManagerConfig = viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName]
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName)
  }

  render() {
    const { source, resizeMode, subtitleUri } = this.props
    source.initOptions = source.initOptions || []

    const RCTVideoInstance = this.getViewManagerConfig('VlcPlayer')

    let nativeResizeMode
    if (resizeMode === 'stretch') {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill

    } else if (resizeMode === 'contain') {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit

    } else if (resizeMode === 'cover') {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill

    } else {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleNone
    }

    const nativeProps = Object.assign({}, this.props)
    Object.assign(nativeProps, {
      style: [styles.base, StyleSheet.absoluteFill],
      source,
      resizeMode: nativeResizeMode,
      subtitleUri,
      onPlaying: this.handleOnPlaying,
      onProgress: this.handleOnProgress,
      onPaused: this.handleOnPaused,
    })

    return (
      <RCTVlcPlayer
        ref={this.assignRoot}
        {...nativeProps} />
    )
  }
}

VlcPLayer.propTypes = {
  /* Wrapper component */
  source: PropTypes.object,

  /* Native only */
  paused: PropTypes.bool,
  seek: PropTypes.number,
  resizeMode: PropTypes.oneOf([
    'contain',
    'cover',
    'stretch',
  ]),
  subtitleUri: PropTypes.string,
  rate: PropTypes.number,
  volume: PropTypes.number,

  onPaused: PropTypes.func,
  onStopped: PropTypes.func,
  onBuffering: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onVolumeChanged: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...View.propTypes,
}

VlcPLayer.defaultProps = {
  resizeMode: 'contain',
}

const RCTVlcPlayer = requireNativeComponent('VlcPlayer', VlcPLayer)
