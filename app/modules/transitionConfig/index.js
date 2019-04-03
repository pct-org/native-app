import forVertical from './forVertical'

export default () => ({
  transitionSpec: {
    duration: 300,
    useNativeDriver: true,
  },

  screenInterpolator: forVertical
})
