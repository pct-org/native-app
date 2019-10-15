import React from 'react'
import { findNodeHandle } from 'react-native'

import Context from './FocusManagerContext'
import * as constants from './FocusManagerConstants'

export default class FocusManager extends React.Component {

  focusRefs = {}

  state = {
    currentFocusContainer: null,
    currentFocusElement: null,
    nextFocus: {
      containerTop: null,
      containerBottom: null,
      elementLeft: null,
      elementRight: null,
    },
  }

  componentWillUnmount() {
    this._tvEventHandler.disable()
  }

  getApi = () => {
    const { currentFocusContainer } = this.state

    return {
      constants,
      addRef: this.addRef,
      updateCurrentItem: this.updateCurrentItem,
    }
  }

  updateCurrentItem = (container, element, nextFocus) => {
    this.setState({
      currentFocusContainer: container,
      currentFocusElement: element,
      nextFocus,
    }, () => {
      const { containerTop, containerBottom, elementLeft, elementRight } = nextFocus

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
