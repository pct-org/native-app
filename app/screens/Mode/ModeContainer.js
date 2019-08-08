import { connect } from 'react-redux'

import useCorrect from 'modules/useCorrect'

import * as HomeActions from '../Home/HomeActions'
import * as HomeSelectors from '../Home/HomeSelectors'

import ModeScreen from './ModeScreen'
import ModeScreenTV from './ModeScreen.tv'

export const mapStateToProps = state => ({
  modes: HomeSelectors.getModes(state),
  isLoading: HomeSelectors.getIsLoading(state),
  hasInternet: HomeSelectors.getHasInternet(state),
})

export default connect(mapStateToProps, HomeActions)(
  useCorrect(ModeScreen, null, ModeScreenTV),
)
