import getSceneIndicesForInterpolationInputRange from './getSceneIndicesForInterpolationInputRange'

/**
 * Based on: https://github.com/react-navigation/react-navigation-stack/blob/master/src/views/StackView/StackViewStyleInterpolator.js
 */

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial(props) {
  const { navigation, scene } = props

  const focused = navigation.state.index === scene.index
  const opacity = focused ? 1 : 0
  // If not focused, move the scene far away.
  const translate = focused ? 0 : 1000000
  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }],
  }
}

export default (props) => {
  const { layout, position, scene } = props

  if (!layout.isMeasured) {
    return forInitial(props)
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props)

  if (!interpolate) return { opacity: 0 }

  const { first, last } = interpolate
  const index = scene.index

  const height = layout.initHeight

  const translateY = position.interpolate({
    inputRange : [first, index, last],
    outputRange: [height, 0, height * -0.3],
    extrapolate: 'clamp',
  })

  const shadowOpacity = position.interpolate({
    inputRange : [first, index, last],
    outputRange: [0, 0.7, 0],
    extrapolate: 'clamp',
  })

  return {
    transform: [{ translateY }],
    shadowOpacity,
  }
}
