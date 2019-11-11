import { Dimensions, StatusBar } from 'react-native'

import useCorrect from 'modules/useCorrect'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const UNIT = 8
const SKETCH_DEFAULT_WIDTH = useCorrect(360, null, 1920)

const sketchAdjuster = screenWidth / SKETCH_DEFAULT_WIDTH

const getWidth = (sketchSize) => {
  return sketchSize * sketchAdjuster
}

const getHeight = (sketchSize) => {
  return sketchSize * sketchAdjuster
}

export default {

  UNIT: useCorrect(UNIT, null, UNIT * 2),

  ICON_SIZE_DEFAULT: 24,
  ICON_SIZE_MEDIUM: 32,

  ICON_CAST_SIZE: UNIT * 6,

  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,

  STATUSBAR_HEIGHT: StatusBar.currentHeight,

  BORDER_RADIUS: 5,

  CARD_HEIGHT: getHeight(130),
  CARD_WIDTH: getWidth(90),
  CARD_HEIGHT_SMALL: getHeight(useCorrect(116, null, 252)),
  CARD_WIDTH_SMALL: getWidth(useCorrect(81, null, 172)),
  CARD_HEIGHT_BIG: getHeight(useCorrect(null, null, 410)),
  CARD_WIDTH_BIG: getWidth(useCorrect(null, null, 280)),

  MY_EPISODE_CARD_HEIGHT: getHeight(100),
  MY_EPISODE_CARD_WIDTH: getWidth(178),

  EPISODE_CARD_HEIGHT: getHeight(68),
  EPISODE_CARD_WIDTH: getWidth(121),

  QUALITY_WIDTH: getWidth(74),
  QUALITY_HEIGHT: getHeight(36),

  TV_LEFT: getWidth(155),

  getTop: getHeight,
  getBottom: getHeight,
  getWidth,
  getHeight,
}
