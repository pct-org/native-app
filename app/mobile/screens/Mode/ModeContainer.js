import { connect } from 'react-redux'

import useCorrect from 'modules/useCorrect'

import ModeScreen from './ModeScreen'
import ModeScreenTV from './ModeScreen.tv'

export const mapStateToProps = state => ({
})

export default connect(mapStateToProps, HomeActions)(
  useCorrect(ModeScreen, null, ModeScreenTV),
)
