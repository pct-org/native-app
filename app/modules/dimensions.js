import { Dimensions, StatusBar } from 'react-native'

const { width, height, fontScale } = Dimensions.get('window')

const CARD_MEDIUM_WIDTH = (width - 40) / 3.1
const CARD_MEDIUM_HEIGHT = ((height - StatusBar.currentHeight) / 4) * fontScale

export default {

  UNIT: 8,

  SCREEN_WIDTH : width,
  SCREEN_HEIGHT: height,

  BORDER_RADIUS: 5,

  CARD_MEDIUM_WIDTH,
  CARD_MEDIUM_HEIGHT,

  MY_EPISODE_CARD_WIDTH : CARD_MEDIUM_WIDTH * 2.5,
  MY_EPISODE_CARD_HEIGHT: CARD_MEDIUM_HEIGHT,

  ICON_PLAY_SMALL: 45,  // My Episode
  ICON_PLAY_MEDIUM: 50, // Home, Item

}
