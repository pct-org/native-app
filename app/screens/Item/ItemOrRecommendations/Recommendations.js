import React from 'react'
import { ActivityIndicator } from 'react-native'

import Popcorn from 'modules/PopcornSDK'

import CardList from 'components/CardList'

export default class Recommendations extends React.PureComponent {

  static getDerivedStateFromProps(props) {
    if (props.recommendations.length > 0) {
      return {
        fetching: false,
      }
    }

    return {}
  }

  static propTypes = {}

  static defaultProps = {}

  state = {
    fetching: true,
  }

  componentDidMount() {
    const { item, onFetchedRecommendations, recommendations } = this.props

    if (recommendations.length === 0) {
      Popcorn.getShowRecommendations(item).then((foundRecommendations) => {

        onFetchedRecommendations(
          foundRecommendations.splice(0, 12),
        )
      })
    }
  }

  render() {
    const { getItem, recommendations } = this.props
    const { fetching } = this.state

    return (
      <React.Fragment>

        <CardList
          handleItemOpen={getItem}
          items={recommendations}
          ListFooterComponent={null} />

        {fetching && (
          <ActivityIndicator
            color={'#FFF'}
            size={50}
            animating={fetching}
            hidesWhenStopped />
        )}

      </React.Fragment>
    )
  }

}
