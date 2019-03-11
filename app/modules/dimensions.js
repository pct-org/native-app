import { Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')

const CARD_MEDIUM_WIDTH = (width - 40) / 3.1
const CARD_MEDIUM_HEIGHT = (height - StatusBar.currentHeight) / 4

export default {

  UNIT: 8,

  BORDER_RADIUS: 5,

  CARD_MEDIUM_WIDTH,
  CARD_MEDIUM_HEIGHT,

  MY_EPISODE_CARD_WIDTH: CARD_MEDIUM_WIDTH * 2.5,
  MY_EPISODE_CARD_HEIGHT: CARD_MEDIUM_HEIGHT,

}
