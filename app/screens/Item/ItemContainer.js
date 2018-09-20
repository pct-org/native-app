import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from './ItemActions'
import * as Selectors from './ItemSelectors'

import Item from './ItemScreen'

export const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(Actions, dispatch),
})

export const mapStateToProps = state => ({
  item           : Selectors.getItem(state),
  isLoading      : Selectors.getIsLoading(state),
  selectedSeason : Selectors.getSelectedSeason(state),
  selectedEpisode: Selectors.getSelectedEpisode(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
