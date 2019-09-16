import { connect } from 'react-redux'

// import { getFetchingBetter } from 'mobile/screens/Item/ItemSelectors'
import * as QualtiySelectorActions from './QualtiySelectorActions'

import QualitySelector from './QualitySelector'

const mapStateToProps = state => ({
  fetchingBetter: false, // getFetchingBetter(state),
})

export default QualitySelector //connect(mapStateToProps, QualtiySelectorActions)(QualitySelector)
