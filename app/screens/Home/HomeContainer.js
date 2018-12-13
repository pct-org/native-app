import { connect } from 'react-redux'
import Device from 'modules/DeviceDetection'

import * as Actions from './HomeActions'
import * as Selectors from './HomeSelectors'

import Home from './HomeScreen'
import HomeTablet from './HomeScreen.tablet'

export const mapStateToProps = state => ({
  modes      : Selectors.getModes(state),
  isLoading  : Selectors.getIsLoading(state),
  hasInternet: Selectors.getHasInternet(state),
})

export default connect(mapStateToProps, Actions)(Device.isTablet ? HomeTablet : Home)
