import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from './HomeActions'
import * as Selectors from './HomeSelectors'

import Home from './HomeScreen'

export const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(Actions, dispatch),
})

export const mapStateToProps = state => ({
  modes      : Selectors.getModes(state),
  isLoading  : Selectors.getIsLoading(state),
  hasInternet: Selectors.getHasInternet(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
