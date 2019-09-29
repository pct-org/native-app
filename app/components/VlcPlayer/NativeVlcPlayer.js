import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, requireNativeComponent, NativeModules, StatusBar } from 'react-native'

export default class NativeVlcPlayer extends Component {
  constructor(props, context) {
    super(props, context)
    this.seek = this.seek.bind(this)
    this._assignRoot = this._assignRoot.bind(this)
    this._onError = this._onError.bind(this)
    this._onProgress = this._onProgress.bind(this)
    this._onEnded = this._onEnded.bind(this)
    this._onPlaying = this._onPlaying.bind(this)
    this._onStopped = this._onStopped.bind(this)
    this._onPaused = this._onPaused.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
    this._onVolumeChanged = this._onVolumeChanged.bind(this)
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  seek(pos) {
    this.setNativeProps({ seek: pos })
  }

  presentFullscreenPlayer = () => {
    console.log('presentFullscreenPlayer')
    this.setNativeProps({ fullscreen: true })
    StatusBar.setHidden(true)
  }

  dismissFullscreenPlayer = () => {
    console.log('dismissFullscreenPlayer')
    this.setNativeProps({ fullscreen: false })
    StatusBar.setHidden(false)
  }

  _assignRoot(component) {
    this._root = component
  }

  _onBuffering(event) {
    if (this.props.onVLCBuffering) {
      this.props.onVLCBuffering(event.nativeEvent)
    }
  }

  _onError(event) {
    if (this.props.onVLCError) {
      this.props.onVLCError(event.nativeEvent)
    }
  }

  _onProgress(event) {
    if (this.props.onVLCProgress) {
      this.props.onVLCProgress(event.nativeEvent)
    }
  }

  _onEnded(event) {
    if (this.props.onVLCEnded) {
      this.props.onVLCEnded(event.nativeEvent)
    }
  }

  _onStopped(event) {
    this.setNativeProps({ paused: true })

    if (this.props.onVLCStopped) {
      this.props.onVLCStopped(event.nativeEvent)
    }
  }

  _onPaused(event) {
    if (this.props.onVLCPaused) {
      this.props.onVLCPaused(event.nativeEvent)
    }
  }

  _onPlaying(event) {
    console.log('_onPlaying',event)
    if (this.props.onVLCPlaying) {
      this.props.onVLCPlaying()
    }
  }

  _onVolumeChanged(event) {
    if (this.props.onVLCVolumeChanged) {
      this.props.onVLCVolumeChanged(event.nativeEvent)
    }
  }

  getViewManagerConfig = viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName]
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName)
  }

  render() {
    const {
      source,
      resizeMode,
    } = this.props
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
      style: [styles.base, nativeProps.style],
      source: source,
      resizeMode: nativeResizeMode,
//      onVLCError: this._onError,
 //     onVLCProgress: this._onProgress,
//      onVLCEnded: this._onEnded,
      onVLCPlaying: this._onPlaying,
      // onVLCPaused: this._onPaused,
      // onVLCStopped: this._onStopped,
      // onVLCBuffering: this._onBuffering,
      // onVLCVolumeChanged: this._onVolumeChanged,
    })

    return (
      <RCTVlcPlayer
        ref={this._assignRoot}
        {...nativeProps} />
    )
  }
}

NativeVlcPlayer.propTypes = {
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
  rate: PropTypes.number,
  volume: PropTypes.number,
  snapshotPath: PropTypes.string,

  onVLCPaused: PropTypes.func,
  onVLCStopped: PropTypes.func,
  onVLCBuffering: PropTypes.func,
  onVLCPlaying: PropTypes.func,
  onVLCEnded: PropTypes.func,
  onVLCError: PropTypes.func,
  onVLCProgress: PropTypes.func,
  onVLCVolumeChanged: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...View.propTypes,
}

NativeVlcPlayer.defaultProps = {
  resizeMode: 'contain',
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
})

const RCTVlcPlayer = requireNativeComponent('VlcPlayer', NativeVlcPlayer)
