import { Dimensions, StatusBar, Platform } from 'react-native'

const { width: screenWidth, height: screenHeight, fontScale } = Dimensions.get('window')

const UNIT = 8

let width = screenWidth
let height = screenHeight

if (Platform.isTV) {
  width = 425
  height = 725
}

const CARD_MEDIUM_WIDTH = (width - 40) / 3.1
const CARD_MEDIUM_HEIGHT = ((height - StatusBar.currentHeight) / 4) * fontScale

export default {

  UNIT,

  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,

  STATUSBAR_HEIGHT: StatusBar.currentHeight,

  BORDER_WIDTH: 1.5,
  BORDER_RADIUS: 5,

  CARD_SMALL_WIDTH: CARD_MEDIUM_WIDTH - UNIT,
  CARD_SMALL_HEIGHT: CARD_MEDIUM_HEIGHT - UNIT,

  CARD_MEDIUM_WIDTH,
  CARD_MEDIUM_HEIGHT,

  MY_EPISODE_CARD_WIDTH: ((300 - 40) / 3.1) * 2.5,
  MY_EPISODE_CARD_HEIGHT: (((500 - StatusBar.currentHeight) / 4) * fontScale) - UNIT,

  EPISODE_CARD_WIDTH: 150,
  EPISODE_CARD_HEIGHT: 100,

  ICON_PLAY_SMALL: Platform.isTV ? 30 : 45,  // My Episode
  ICON_PLAY_MEDIUM: 50, // Home, Item

  ITEM_ICONS: 35,
}
