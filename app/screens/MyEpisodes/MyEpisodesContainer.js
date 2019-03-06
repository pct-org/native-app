import { connect } from 'react-redux'

import * as HomeActions from '../Home/HomeActions'
import * as HomeSelectors from '../Home/HomeSelectors'

import MyEpisodes from './MyEpisodesScreen'

export const mapStateToProps = state => ({
  myEpisodes: HomeSelectors.getModes(state).myEpisodes,
})

export default connect(mapStateToProps, HomeActions)(MyEpisodes)
