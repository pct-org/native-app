import React from 'react'
import { Picker, StyleSheet, View } from 'react-native'

import colors from 'modules/colors'
import i18n from 'modules/i18n'

import Episode from './Episode'

export const styles = StyleSheet.create({

  dropDown: {
    margin: 8,

    height         : 50,
    width          : 150,
    backgroundColor: colors.BACKGROUND_LIGHTER,
  },

})

export default class SeasonsAndEpisodes extends React.PureComponent {

  static getDerivedStateFromProps(nextProps, state) {
    const { item: nextItem } = nextProps
    const { activeSeason, onlyWhenHigherThen } = state

    const newSeasonCount = nextItem && nextItem.seasons && nextItem.seasons.length > 0
      ? nextItem.seasons[nextItem.seasons.length - 1].number
      : 0

    // If we retrieve more season then update to the latest one
    if (newSeasonCount > activeSeason && newSeasonCount > onlyWhenHigherThen) {
      return {
        activeSeason      : nextItem.seasons[nextItem.seasons.length - 1].number,
        onlyWhenHigherThen: nextItem.seasons.length,
      }
    }

    return null
  }

  static propTypes = {}

  static defaultProps = {}

  state = {
    activeSeason      : null,
    onlyWhenHigherThen: 0,
  }

  getAiredEpisodes = () => {
    const { activeSeason } = this.state
    const today = Date.now()

    if (!activeSeason) {
      return []
    }

    const season = this.getSeasons(activeSeason)

    if (!season) {
      return []
    }

    return season.episodes.filter(episode => episode.aired < today)
  }

  getSeasons = (seasonNr = null) => {
    const { item } = this.props

    if (!item || !item.seasons || item.seasons.length === 0) {
      if (seasonNr) {
        return null
      }

      return []
    }

    if (seasonNr) {
      return item.seasons.find(season => season.number === seasonNr)
    }

    return item.seasons
  }

  render() {
    const { playItem } = this.props
    const { activeSeason } = this.state

    return (
      <View>
        <Picker
          mode={'dropdown'}
          selectedValue={activeSeason}
          style={styles.dropDown}
          onValueChange={(itemValue) => this.setState({ activeSeason: itemValue })}>

          {this.getSeasons().map(season => (
            <Picker.Item
              color={'#FFF'}
              key={season.number}
              label={i18n.t('Season {{number}}', { number: season.number })}
              value={season.number} />
          ))}

        </Picker>

        {this.getAiredEpisodes().map(episode => (
          <Episode
            key={episode.key}
            playItem={playItem}
            {...episode} />
        ))}
      </View>
    )
  }

}
