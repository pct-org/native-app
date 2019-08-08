import { connect } from 'react-redux'

import useCorrect from 'modules/useCorrect'

import * as ItemActions from './ItemActions'
import * as Selectors from './ItemSelectors'

import Item from './ItemScreen'
import ItemTV from './ItemScreen.tv'

export const mapStateToProps = state => ({
  item: Selectors.getItem(state),
  isLoading: Selectors.getIsLoading(state),
})

export default connect(mapStateToProps, ItemActions)(
  useCorrect(Item, null, ItemTV),
)
