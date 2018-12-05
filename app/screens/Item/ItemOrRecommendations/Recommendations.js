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

  static propTypes = {}

  static defaultProps = {}

  state = {
    fetching       : true,
    recommendations: [],
  }

  componentDidMount() {
    const { item } = this.props
    const { recommendations } = this.state

    if (recommendations.length === 0) {
      Popcorn.getShowRecommendations(item).then((foundRecommendations) => {
        this.setState({
          fetching       : false,
          recommendations: foundRecommendations.splice(0, 12),
        })
      })
    }
  }

  render() {
    const { getItem } = this.props
    const { fetching, recommendations } = this.state

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
