import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'

export const ContainerContext = React.createContext({ focusedIndex: 0 })

export default class FocusContainer extends React.Component {

  static propTypes = {
    offset: PropTypes.number,
  }

  static defaultProps = {
    offset: 0,
  }

  childLayouts = []

  transformY = new Animated.Value(0)

  state = {
    focusedIndex: 0,
  }

  handleChildGainedFocus = (index) => () => {
    // TODO:: Check if this function is causing all the rerenders
    const { focusedIndex } = this.state
    const { offset } = this.props

    if (focusedIndex === index) {
      return
    }

    console.log('handleChildGainedFocus', index)

    let toValue = this.childLayouts[index]?.y ?? 0

    if (toValue > 0) {
      toValue = toValue - offset
    }

    this.setState({
      focusedIndex: index,
    })

    Animated.timing(
      this.transformY,
      {
        toValue: -(toValue),
        easing: Easing.linear,
        duration: 220,
        useNativeDriver: true,
      },
    ).start()
  }

  renderChildren = () => React.Children.map(this.props.children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        index,
        onLayout: (event) => {
          this.childLayouts[index] = event.nativeEvent.layout
        },
        gainedFocus: this.handleChildGainedFocus(index),
      })
    }
  })

  render() {
    // const { children } = this.props
    const { focusedIndex } = this.state

    console.log('render focus container')
    return (
      <ContainerContext.Provider value={{ focusedIndex }}>
        <Animated.View style={{ transform: [{ translateY: this.transformY }] }}>
          {this.renderChildren()}
        </Animated.View>
      </ContainerContext.Provider>
    )
  }

}

/**
 *  render() {
    const { children } = this.props
    const { transformY, focusedIndex } = this.state

    return (
      <ContainerContext.Provider value={this.getApi()}>
        <Animated.View style={{ transform: [{ translateY: transformY }] }}>
          {children}
        </Animated.View>
      </ContainerContext.Provider>
    )
  }

 */
/**
 import React from 'react'
 import PropTypes from 'prop-types'
 import { Animated, Easing } from 'react-native'

 export const ContainerContext = React.createContext({ focusedIndex: 0 })

 export default class FocusContainer extends React.Component {

  static propTypes = {
    offset: PropTypes.number,
  }

  static defaultProps = {
    offset: 0,
  }

  childLayouts = {}

  state = {
    focusedIndex: 0,
    focusedId: null,
    transformY: new Animated.Value(0),
  }

  handleChildGainedFocus = (id) => {
    const { transformY } = this.state
    const { offset } = this.props

    let toValue = this.childLayouts[id]?.y ?? 0

    if (toValue > 0) {
      toValue = toValue - offset
    }

    this.setState({
      focusedIndex: this.getIndexForId(id),
      focusedId: id,
    })

    Animated.timing(
      transformY,
      {
        toValue: -(toValue),
        easing: Easing.linear,
        duration: 250,
        useNativeDriver: true,
      },
    ).start()
  }

  handleAddLayout = (id, event) => {
    this.childLayouts[id] = event.nativeEvent.layout
  }

  getIndexForId = (id) => {
    const index = Object.keys(this.childLayouts).indexOf(id)

    return index > -1 ? index : 0
  }

  getApi = () => {
    const { focusedIndex, focusedId } = this.state

    return {
      focusedIndex,
      focusedId,
      addLayout: this.handleAddLayout,
      gainedFocus: this.handleChildGainedFocus,
      getIndexForId: this.getIndexForId,
    }
  }

  render() {
    const { children } = this.props
    const { transformY, focusedIndex } = this.state

    return (
      <ContainerContext.Provider value={{ focusedIndex }}>
        <Animated.View style={{ transform: [{ translateY: transformY }] }}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              index,
              onLayout: (event) => {
                this.childLayouts[index] = event.nativeEvent.layout
                this.childOpacities[index] = new Animated.Value(1)
              },
              gainedFocus: this.handleChildGainedFocus(index),
            })
          })}
        </Animated.View>
      </ContainerContext.Provider>
    )
  }

}

 /**
 *  render() {
    const { children } = this.props
    const { transformY, focusedIndex } = this.state

    return (
      <ContainerContext.Provider value={this.getApi()}>
        <Animated.View style={{ transform: [{ translateY: transformY }] }}>
          {children}
        </Animated.View>
      </ContainerContext.Provider>
    )
  }

 */
/**
 {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              onLayout: (event) => {
                this.childLayouts[index] = event.nativeEvent.layout
                this.childOpacities[index] = new Animated.Value(1)
              },
              gainedFocus: this.handleChildGainedFocus(index),
            })
          })}
 **/
