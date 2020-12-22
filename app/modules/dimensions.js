import { Dimensions, StatusBar, Platform } from 'react-native'

import useCorrect from 'modules/useCorrect'

const { width, height } = Dimensions.get('window')

let screenWidth = width
let screenHeight = height

if (width > height && !Platform.isTV) {
  screenWidth = (height)
  screenHeight = (width)
}

const UNIT = 8
const SKETCH_DEFAULT_WIDTH = useCorrect(360, null, 1920)
const STATUSBAR_HEIGHT = StatusBar.currentHeight

const sketchAdjuster = screenWidth / SKETCH_DEFAULT_WIDTH

export const getWidth = (sketchSize) => sketchSize * sketchAdjuster

export const getHeight = (sketchSize) => sketchSize * sketchAdjuster

export default {

  UNIT: useCorrect(UNIT, null, UNIT * 2),

  ICON_SIZE_SMALL: 18,
  ICON_SIZE_DEFAULT: 24,
  ICON_SIZE_MEDIUM: 32,
  ICON_SIZE_TV_MEDIUM: 60,

  ICON_PLAY_DEFAULT: 30,
  ICON_PLAY_BIG: 45,

  ICON_CAST_SIZE: UNIT * 6,

  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,
  SCREEN_HEIGHT_NO_STATUS_BAR: screenHeight - STATUSBAR_HEIGHT,

  ON_SCREEN_NAVIGATION_HEIGHT: 55,
  STATUSBAR_HEIGHT,

  BORDER_WIDTH: 1.5,
  BORDER_RADIUS: 5,

  SEARCH_BAR_HEIGHT: getHeight(40),
  SEARCH_BAR_BORDER_RADIOS: getHeight(6),
  SEARCH_BAR_ICON_SIZE: getHeight(24),

  CARD_HEIGHT: getHeight(useCorrect(130, null, 252)),
  CARD_WIDTH: getWidth(useCorrect(90, null, 175)),
  CARD_HEIGHT_SMALL: getHeight(useCorrect(116, null, 252)),
  CARD_WIDTH_SMALL: getWidth(useCorrect(81, null, 172)),
  CARD_HEIGHT_BIG: getHeight(useCorrect(null, null, 410)),
  CARD_WIDTH_BIG: getWidth(useCorrect(null, null, 280)),

  MY_EPISODE_CARD_HEIGHT: getHeight(useCorrect(100, null, 214)),
  MY_EPISODE_CARD_WIDTH: getWidth(useCorrect(178, null, 380)),
  MY_EPISODE_CARD_SMALL_HEIGHT: getHeight(75),
  MY_EPISODE_CARD_SMALL_WIDTH: getWidth(135),

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
