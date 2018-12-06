import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { material, systemWeights } from 'react-native-typography'

import Popcorn from 'modules/PopcornSDK'

import CardList from 'components/CardList'

export const styles = StyleSheet.create({

  buttonContainer: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    display       : 'flex',
    flexDirection : 'row',
    width         : '100%',

    paddingBottom: 16,
  },

  buttons: {
    ...material.subheadingWhiteObject,
    ...systemWeights.light,
    marginRight : 8,
    paddingLeft : 8,
    paddingRight: 8,
    paddingTop  : 16,
    marginBottom: 16,
  },

  buttonActive: {
    borderTopWidth: 2,
    borderTopColor: '#fff',
    ...material.subheadingWhiteObject,
    ...systemWeights.bold,
  },

})

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
          <ActivityIndicator color={'#FFF'} size={50} animating={fetching} hidesWhenStopped />
        )}

      </React.Fragment>
    )
  }

}
