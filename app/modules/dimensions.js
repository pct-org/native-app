import { Dimensions, StatusBar } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const UNIT = 8
const SKETCH_DEFAULT_WIDTH = 360

const sketchAdjuster = screenWidth / SKETCH_DEFAULT_WIDTH

const getWidth = (sketchSize) => {
  return sketchSize * sketchAdjuster
}

const getHeight = (sketchSize) => {
  return sketchSize * sketchAdjuster
}

export default {

  UNIT,

  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,

  STATUSBAR_HEIGHT: StatusBar.currentHeight,

  BORDER_RADIUS: 5,

  CARD_HEIGHT: getHeight(130),
  CARD_WIDTH: getWidth(90),

  MY_EPISODE_CARD_HEIGHT: getHeight(100),
  MY_EPISODE_CARD_WIDTH: getWidth(178),

  EPISODE_CARD_HEIGHT: getHeight(68),
  EPISODE_CARD_WIDTH: getWidth(121),

  getWidth,
  getHeight,
}
