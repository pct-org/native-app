import { connect } from 'react-redux'

import * as HomeActions from '../Home/HomeActions'
import * as HomeSelectors from '../Home/HomeSelectors'

import MyEpisodes from './MyEpisodesScreen'

export const mapStateToProps = state => ({
  modes: HomeSelectors.getModes(state),
})

export default connect(mapStateToProps, HomeActions)(MyEpisodes)
