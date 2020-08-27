import React from 'react'
import { findNodeHandle, TVEventHandler } from 'react-native'

import Context from './FocusManagerContext'
import * as constants from './FocusManagerConstants'

export default class FocusManager extends React.Component {

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

      // if (evt && evt.eventType === 'right') {
      //   cmp.setState({ board: cmp.state.board.move(2) })
      // } else if (evt && evt.eventType === 'up') {
      //   cmp.setState({ board: cmp.state.board.move(1) })
      // } else if (evt && evt.eventType === 'left') {
      //   cmp.setState({ board: cmp.state.board.move(0) })
      // } else if (evt && evt.eventType === 'down') {
      //   cmp.setState({ board: cmp.state.board.move(3) })
      // } else if (evt && evt.eventType === 'playPause') {
      //   cmp.restartGame()
      // }

      console.log(dirty, evt)
    })
  }

  componentWillUnmount() {
    // this._tvEventHandler?.disable()
  }

  getApi = () => {
    const { dirty } = this.state

    return {
      constants,
      dirty,
      addRef: this.addRef,
      updateCurrentItem: this.updateCurrentItem,
      toRight: this.handleToRight,
    }
  }

  handleToRight = () => this.handleDirection('elementRight')

  handleDirection = (direction) => {
    const { nextFocus } = this.state

    console.log('handleDirection', direction)
    console.log(this.focusRefs[nextFocus[direction]])
    console.log('\n\n')

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
