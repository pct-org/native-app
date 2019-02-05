import React from 'react'
import { View, StyleSheet } from 'react-native'

import i18n from 'modules/i18n'
import colors from 'modules/colors'

import TextButton from 'components/TextButton'

import SeasonsAndEpisodes from './SeasonsAndEpisodes'
import Recommendations from './Recommendations'

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
    marginRight : 8,
    paddingLeft : 8,
    paddingRight: 8,
    paddingTop  : 16,
    marginBottom: 16,
  },

  buttonActive: {
    borderTopWidth: 2,
    borderTopColor: colors.ITEM_ACTIVE_TAB_INDICATOR,
  },

})

export default class ItemOrRecommendations extends React.PureComponent {

  static propTypes = {}

  static defaultProps = {}

  state = {
    recommendationActive: false,
    recommendations     : [],
  }

  handleViewRecommendation = (recommendationActive) => {
    this.setState({
      recommendationActive,
    })
  }

  handleFetchedRecommendations = (recommendations) => {
    this.setState({
      recommendations,
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
    const { item, playItem, getItem } = this.props
    const { recommendationActive, recommendations } = this.state

    return (
      <React.Fragment>
        <View style={styles.buttonContainer}>
          <TextButton
            onPress={() => this.handleViewRecommendation(false)}
            fontWeight={recommendationActive ? 'regular' : 'bold'}
            style={this.getStyles(false)}>
            {i18n.t('Episodes')}
          </TextButton>

          <TextButton
            onPress={() => this.handleViewRecommendation(true)}
            fontWeight={recommendationActive ? 'bold' : 'regular'}
            style={this.getStyles(true)}>
            {i18n.t('More like this')}
          </TextButton>
        </View>

        {!recommendationActive && (
          <SeasonsAndEpisodes
            item={item}
            playItem={playItem}
          />
        )}

        {recommendationActive && (
          <Recommendations
            onFetchedRecommendations={this.handleFetchedRecommendations}
            recommendations={recommendations}
            item={item}
            getItem={getItem} />
        )}

      </React.Fragment>
    )
  }

}
