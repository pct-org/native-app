import React from 'react'
import { findNodeHandle, TVEventHandler, Animated, Easing } from 'react-native'
import { transitionDuration } from 'tv/modules/BackgroundManager/BackgroundManager'

import Context from './FocusManagerContext'
import * as constants from './FocusManagerConstants'

export default class FocusProvider extends React.Component {

  focusRefs = {}

  state = {
    dirty: false,
    currentFocusContainer: null,
    currentFocusElement: null,
    nextFocus: {
      elementTop: null,
      elementBottom: null,
      elementLeft: null,
      elementRight: null,
    },
  }

  componentDidMount() {
    this._tvEventHandler = new TVEventHandler()
    this._tvEventHandler.enable(this, function(manager, evt) {
      const { dirty } = manager.state

      // eventKeyAction is an integer value representing button press(key down) and release(key up). "key up" is 1, "key down" is 0.

      // if (eventType === 'playPause' && eventKeyAction === 0)
      // {
      //   console.log('play pressed')
      // }

      if (!dirty && ['up', 'right', 'down', 'left'].includes(evt.eventType)) {
        console.log('set dirty state')
        manager.setState({ dirty: true })
      }

      console.log(dirty, evt)
    })
  }

  componentWillUnmount() {
    this._tvEventHandler?.disable()
  }

  getApi = () => {
    const { dirty, currentFocusContainer } = this.state

    return {
      constants,
      dirty,
      currentFocusContainer,
      addRef: this.addRef,
      updateCurrentItem: this.updateCurrentItem,
      toRight: this.handleToRight,
      focusContainer: this.focusContainer,
    }
  }

  focusContainer = (container, value, toValue) => {
    const { currentFocusContainer } = this.state

    if (currentFocusContainer !== container) {
      this.setState({
        currentFocusContainer: container,
      }, () => {
        Animated.timing(
          value,
          {
            toValue: toValue,
            easing: Easing.linear,
            duration: 250,
            useNativeDriver: true,
          },
        ).start()
      })
    }
  }

  handleToRight = () => this.handleDirection('elementRight')

  handleDirection = (direction) => {
    const { nextFocus } = this.state

    if (this.focusRefs[nextFocus[direction]]) {
      this.focusRefs[nextFocus[direction]].setNativeProps({ hasTVPreferredFocus: true })
    }
  }

  updateCurrentItem = (container, element, nextFocus) => {
    this.setState({
      currentFocusContainer: container,
      currentFocusElement: element,
      nextFocus,
    }, () => {
      const { elementTop, elementBottom, elementLeft, elementRight } = nextFocus

      const next = {
        nextFocusLeft: findNodeHandle(this.focusRefs[elementLeft]),
        nextFocusRight: findNodeHandle(this.focusRefs[elementRight]),
      }

      this.focusRefs[element].setNativeProps(next)
    })
  }

  addRef = (key, ref) => {
    this.focusRefs[key] = ref
  }

  render() {
    const { children } = this.props

    return (
      <Context.Provider value={this.getApi()}>
        {children}
      </Context.Provider>
    )
  }

}
