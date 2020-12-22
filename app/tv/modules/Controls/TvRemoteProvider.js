import React from 'react'
import { findNodeHandle, TVEventHandler } from 'react-native'

import Context from './FocusManagerContext'

export const useTvRemoteProvider = () => React.useContext(Context)

export default class TvRemoteProvider extends React.Component {

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

      if (!dirty && ['up', 'right', 'down', 'left'].includes(evt.eventType)) {
        manager.setState({ dirty: true })
      }
    })
  }

  componentWillUnmount() {
    this._tvEventHandler?.disable()
  }

  getApi = () => {
    const { dirty, currentFocusElement } = this.state

    return {
      dirty,
      currentFocusElement,
      addRef: this.addRef,
      onFocus: this.handleFocusChange,
      updateCurrentItem: this.updateCurrentItem,
      toRight: this.handleToRight,
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
        nextFocusDown: findNodeHandle(this.focusRefs[elementBottom]),
      }

      // this.focusRefs[element].setNativeProps(next)
    })
  }

  handleFocusChange = (element, nextFocus) => () => {
    const { currentFocusElement } = this.state

    this.setState({
      nextFocus,
      currentFocusElement: element,
    }, () => {
      const { elementTop = null, elementBottom = null, elementLeft = null, elementRight = null } = nextFocus

      const next = {
        nextFocusUp: elementTop !== null
          ? findNodeHandle(this.focusRefs[elementTop])
          : null,

        nextFocusLeft: elementLeft !== null
          ? findNodeHandle(this.focusRefs[elementLeft])
          : null,

        nextFocusRight: elementRight !== null
          ? findNodeHandle(this.focusRefs[elementRight])
          : null,

        nextFocusDown: elementBottom !== null
          ? findNodeHandle(this.focusRefs[elementBottom])
          : null,
      }

      console.log('focus change', element, next)

      this.focusRefs[element].setNativeProps(next)
    })
  }

  addRef = (key) => (ref) => {
    console.log(ref)
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
