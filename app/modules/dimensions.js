import { Dimensions, StatusBar } from 'react-native'

const { width, height, fontScale } = Dimensions.get('window')

const UNIT = 8

const CARD_MEDIUM_WIDTH = (width - 40) / 3.1
const CARD_MEDIUM_HEIGHT = ((height - StatusBar.currentHeight) / 4) * fontScale

export default {

  UNIT,

  SCREEN_WIDTH : width,
  SCREEN_HEIGHT: height,

  STATUSBAR_HEIGHT: StatusBar.currentHeight,

  BORDER_RADIUS: 5,

  CARD_SMALL_WIDTH: CARD_MEDIUM_WIDTH - UNIT,
  CARD_SMALL_HEIGHT: CARD_MEDIUM_HEIGHT - UNIT,

  CARD_MEDIUM_WIDTH,
  CARD_MEDIUM_HEIGHT,

  MY_EPISODE_CARD_WIDTH : CARD_MEDIUM_WIDTH * 2.5,
  MY_EPISODE_CARD_HEIGHT: CARD_MEDIUM_HEIGHT,

  EPISODE_CARD_WIDTH : 150,
  EPISODE_CARD_HEIGHT: 100,

  ICON_PLAY_SMALL: 45,  // My Episode
  ICON_PLAY_MEDIUM: 50, // Home, Item

  ITEM_ICONS: 35,
}
