import { connect } from 'react-redux'

import { getFetchingBetter } from 'screens/Item/ItemSelectors'
import * as QualtiySelectorActions from './QualtiySelectorActions'

import QualitySelector from './QualitySelector'

const mapStateToProps = state => ({
  fetchingBetter: getFetchingBetter(state),
})

export default connect(mapStateToProps, QualtiySelectorActions)(QualitySelector)
