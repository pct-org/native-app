import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'

import { ContainerContext } from './FocusContainer'

export class OpacityManager extends React.PureComponent {

  // static contextType = ContainerContext

  state = {
    animatedOpacity: new Animated.Value(1),
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { index } = this.props
    const { focusedIndex } = this.context

    if (focusedIndex > index) {
      Animated.timing(
        this.state.animatedOpacity,
        {
          toValue: 0,
          easing: Easing.linear,
          duration: 220,
          useNativeDriver: true,
        },
      ).start()
    } else {
      Animated.timing(
        this.state.animatedOpacity,
        {
          toValue: 1,
          easing: Easing.linear,
          duration: 220,
          useNativeDriver: true,
        },
      ).start()
    }
  }

  render() {
    const { children, style, onLayout, gainedFocus } = this.props
    const { animatedOpacity } = this.state

    console.log('render opacity manager')

    return (
      <Animated.View
        onLayout={onLayout}
        style={{ ...style, opacity: animatedOpacity }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            gainedFocus,
          })
        })}
      </Animated.View>
    )
  }

}

export default OpacityManager
