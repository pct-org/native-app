import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Card from 'components/Card'
import Typography from 'components/Typography'

import Episode from './Episode'

export const styles = StyleSheet.create({

  container: {
    marginLeft : dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
  },

  seasonSelector: {
    marginBottom: dimensions.UNIT * 4,
  },

  seasonContainer: {
    display: 'flex',
  },

  seasonNumber: {
    marginTop: dimensions.UNIT / 2,
    textAlign: 'center',
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

    return [...item.seasons].reverse()
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

  renderSeason = ({ item }) => {
    const { activeSeason } = this.state

    return (
      <View style={styles.seasonContainer}>
        <Card
          variant={'small'}
          onPress={() => this.handleSeasonChange(item)}
          item={item}
        />

        <Typography
          style={styles.seasonNumber}
          variant={'caption'}
          emphasis={activeSeason === item.season ? 'high' : 'medium'}>
          {i18n.t('Season {{number}}', { number: item.season })}
        </Typography>
      </View>
    )
  }

  render() {
    const seasons = this.getSeasons()
    const episodes = this.getEpisodes()

    return (
      <React.Fragment>

        <FlatList
          removeClippedSubviews
          contentContainerStyle={[styles.container, styles.seasonSelector]}
          data={seasons.length === 0 ? Array(4).fill() : seasons}
          initialNumToRender={4}
          windowSize={4}
          renderItem={this.renderSeason}
          ItemSeparatorComponent={() => <View style={{ width: dimensions.UNIT }} />}
          ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 4 }} />}
          keyExtractor={(item, index) => item ? `${item.number}` : `${index}`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

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
