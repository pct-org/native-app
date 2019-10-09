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

  ICON_SIZE_DEFAULT: 24,
  ICON_SIZE_MEDIUM: 32,

  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,

  STATUSBAR_HEIGHT: StatusBar.currentHeight,

  BORDER_RADIUS: 5,

  CARD_HEIGHT: getHeight(130),
  CARD_WIDTH: getWidth(90),
  CARD_HEIGHT_SMALL: getHeight(116),
  CARD_WIDTH_SMALL: getWidth(81),

  MY_EPISODE_CARD_HEIGHT: getHeight(100),
  MY_EPISODE_CARD_WIDTH: getWidth(178),

  EPISODE_CARD_HEIGHT: getHeight(68),
  EPISODE_CARD_WIDTH: getWidth(121),

  QUALITY_WIDTH: getWidth(74),
  QUALITY_HEIGHT: getHeight(36),

  getWidth,
  getHeight,
}
