import React from 'react'
import { FlatList, Picker, StyleSheet, View } from 'react-native'

import colors from 'modules/colors'
import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'

import Episode from './Episode'
import SeasonSelector from './SeasonSelector'

export const styles = StyleSheet.create({

  dropDown: {
    margin: dimensions.UNIT * 2,

    height         : 50,
    width          : 150,
    backgroundColor: colors.ITEM_DROPDOWN_BACKGROUND,
  },

  dropDownItem: {
    width: 150,
  },

  container: {
    marginLeft : dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
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

  constructor(props) {
    super(props)

    this.today = Date.now()
  }

  getEpisodes = () => {
    const { activeSeason } = this.state

    if (!activeSeason) {
      return []
    }

    const season = this.getSeasons(activeSeason)

    if (!season) {
      return []
    }

    return season.episodes
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

  handleSeasonChange = (season) => {
    this.setState({
      activeSeason: season.number,
    })
  }

  renderEpisode = ({ item }) => {
    const { playItem } = this.props

    return (
      <Episode
        empty={!item}
        playItem={playItem}
        hasAired={item ? item.aired < this.today : false}
        {...item} />
    )
  }

  render() {
    const { activeSeason } = this.state

    const episodes = this.getEpisodes()

    return (
      <React.Fragment>

        <SeasonSelector
          activeSeason={activeSeason}
          selectSeason={this.handleSeasonChange}
          seasons={this.getSeasons()} />

        <FlatList
          removeClippedSubviews
          contentContainerStyle={styles.container}
          data={episodes.length === 0 ? Array(6).fill() : episodes}
          initialNumToRender={10}
          windowSize={10}
          renderItem={this.renderEpisode}
          ItemSeparatorComponent={() => <View style={{ marginBottom: dimensions.UNIT }} />}
          ListFooterComponent={() => <View style={{ marginBottom: dimensions.UNIT * 4 }} />}
          keyExtractor={(item, index) => item ? item.key : `${index}`}
          showsVerticalScrollIndicator={false}
        />

      </React.Fragment>
    )
  }

}
