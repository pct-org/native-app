import { connect } from 'react-redux'

import * as QualtiySelectorActions from './QualtiySelectorActions'

import QualitySelector from './QualitySelector'

export default connect(null, QualtiySelectorActions)(QualitySelector)
