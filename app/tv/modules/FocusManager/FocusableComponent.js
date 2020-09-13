import React from 'react'
import { Animated, Easing } from 'react-native'

import { ContainerContext } from './FocusContainer'

export const FocusableComponent = ({ children, id }) => {
  const { addLayout, gainedFocus, focusedIndex, getIndexForId } = React.useContext(ContainerContext)
  const [opacityInfo, setOpacityInfo] = React.useState({
    opacity: 1,
    animatedOpacity: new Animated.Value(1),
  })

  React.useEffect(() => {
    const index = getIndexForId(id)

    if (index < focusedIndex) {
      Animated.timing(
        opacityInfo.animatedOpacity,
        {
          toValue: 0,
          easing: Easing.linear,
          duration: 220,
          useNativeDriver: true,
        },
      ).start()

    } else {
      Animated.timing(
        opacityInfo.animatedOpacity,
        {
          toValue: 1,
          easing: Easing.linear,
          duration: 220,
          useNativeDriver: true,
        },
      ).start()
    }

  }, [focusedIndex])

  const handleOnLayout = React.useCallback((event) => {
    addLayout(id, event)
  }, [addLayout, id])

  const handleGainedFocus = React.useCallback(() => {
    gainedFocus(id)
  }, [gainedFocus, id])

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { index } = this.props
  //   const { focusedIndex } = this.context
  //
  //   if (focusedIndex > index) {
  //     Animated.timing(
  //       this.state.animatedOpacity,
  //       {
  //         toValue: 0,
  //         easing: Easing.linear,
  //         duration: 220,
  //         useNativeDriver: true,
  //       },
  //     ).start()
  //   } else {
  //     Animated.timing(
  //       this.state.animatedOpacity,
  //       {
  //         toValue: 1,
  //         easing: Easing.linear,
  //         duration: 220,
  //         useNativeDriver: true,
  //       },
  //     ).start()
  //   }
  // }

  return (
    <Animated.View onLayout={handleOnLayout} style={{ opacity: opacityInfo.animatedOpacity }}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          gainedFocus: handleGainedFocus,
        })
      })}
    </Animated.View>
  )
}

export default React.memo(FocusableComponent)
