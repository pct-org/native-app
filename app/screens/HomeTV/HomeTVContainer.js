import { connect } from 'react-redux'

import * as Actions from '../Home/HomeActions'
import * as Selectors from '../Home/HomeSelectors'

import HomeTV from './HomeTVScreen'

export const mapStateToProps = state => ({
  modes: Selectors.getModes(state),
  isLoading: Selectors.getIsLoading(state),
  hasInternet: Selectors.getHasInternet(state),
})

export default connect(mapStateToProps, Actions)(HomeTV)
