import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Card from 'components/Card'
import Typography from 'components/Typography'

import Episode from './Episode'

export const styles = StyleSheet.create({

  container: {
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

  seasonSelector: {
    marginBottom: dimensions.UNIT * 4,
  },

  seasonContainer: {
    display: 'flex',
  },

  seasonsText: {
    marginLeft: dimensions.UNIT * 2,
  },

  seasonNumber: {
    marginTop: dimensions.UNIT / 2,
    textAlign: 'center',
  },

})

// TODO:: Refactor

export default class SeasonsAndEpisodes extends React.Component {

  static getDerivedStateFromProps(nextProps, state) {
    const { item } = nextProps
    const { activeSeason } = state

    // If we retrieve more season then update to the latest one
    if (!activeSeason) {
      return {
        activeSeason: item.seasons[item.seasons.length - 1].number,
      }
    }

    return null
  }

  static propTypes = {}

  static defaultProps = {}

  state = {
    activeSeason: null,
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
    const { item: show } = this.props

    return (
      <Episode
        empty={!item}
        hasAired={item ? item.firstAired < this.today : false}
        hasTorrents={item ? item.torrents.length > 0 : false}
        show={show}
        {...item} />
    )
  }

  renderSeason = ({ item }) => {
    const { activeSeason } = this.state

    return (
      <View style={styles.seasonContainer}>
        <Card
          onPress={() => this.handleSeasonChange(item)}
          item={item}
        />

        <Typography
          style={styles.seasonNumber}
          color={activeSeason === item.number
            ? 'primary'
            : 'white'
          }
          variant={'overline'}
          emphasis={activeSeason === item.number
            ? 'high'
            : 'medium'
          }>
          {i18n.t('Season {{number}}', { number: item.number })}
        </Typography>
      </View>
    )
  }

  render() {
    const seasons = this.getSeasons()
    const episodes = this.getEpisodes()

    return (
      <React.Fragment>

        <Typography
          style={styles.seasonsText}
          color={'white'}
          variant={'headline6'}
          emphasis={'high'}>
          {i18n.t('Seasons')}
        </Typography>

        <FlatList
          removeClippedSubviews
          contentContainerStyle={[styles.container, styles.seasonSelector]}
          data={seasons.length === 0
            ? Array(4).fill(null)
            : seasons}
          initialNumToRender={4}
          windowSize={4}
          renderItem={this.renderSeason}
          ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 4 }} />}
          keyExtractor={(item, index) => item
            ? item._id
            : `${index}`
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <FlatList
          removeClippedSubviews
          contentContainerStyle={styles.container}
          data={episodes.length === 0
            ? Array(6).fill(null)
            : episodes}
          initialNumToRender={4}
          windowSize={6}
          renderItem={this.renderEpisode}
          ListHeaderComponent={() => <View style={{ marginBottom: dimensions.UNIT }} />}
          ItemSeparatorComponent={() => <View style={{ marginBottom: dimensions.UNIT }} />}
          ListFooterComponent={() => <View style={{ marginBottom: dimensions.UNIT * 4 }} />}
          keyExtractor={(item, index) => item
            ? item._id
            : `${index}`
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

      </React.Fragment>
    )
  }

}
