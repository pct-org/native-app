import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { material, systemWeights } from 'react-native-typography'
import { Constants } from 'popcorn-sdk'

import BaseButton from 'components/BaseButton'

import SeasonsAndEpisodes from './SeasonsAndEpisodes'

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

export default class ItemOrRecommendations extends React.PureComponent {

  static propTypes = {}

  static defaultProps = {}

  state = {
    recommendationActive: false,
  }

  handleViewRecommendation = (recommendationActive) => {
    this.setState({
      recommendationActive,
    })
  }

  getStyles = (isRecommendation) => {
    const { recommendationActive } = this.state

    const buttonStyles = [styles.buttons]

    if (isRecommendation && recommendationActive || !isRecommendation && !recommendationActive) {
      buttonStyles.push(styles.buttonActive)
    }

    return buttonStyles
  }

  render() {
    const { item, playItem } = this.props
    const { recommendationActive } = this.state

    return (
      <React.Fragment>
        <View style={styles.buttonContainer}>
          <BaseButton onPress={() => this.handleViewRecommendation(false)}>
            <Text style={this.getStyles(false)}>
              EPISODES
            </Text>
          </BaseButton>

          <BaseButton onPress={() => this.handleViewRecommendation(true)}>
            <Text style={this.getStyles(true)}>
              MORE LIKE THIS
            </Text>
          </BaseButton>
        </View>

        <SeasonsAndEpisodes
          item={item}
          playItem={playItem}
        />

      </React.Fragment>
    )
  }

}
