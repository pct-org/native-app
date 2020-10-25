import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import constants from 'modules/constants'

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

const today = Date.now()

export const SeasonsAndEpisodes = ({ item }) => {
  const [activeSeason, setActiveSeason] = React.useState(item.seasons[item.seasons.length - 1].number)

  const seasonsReverse = React.useMemo(() => [...item.seasons].reverse(), [item.seasons])
  const episodes = React.useMemo(() => {
    const season = item.seasons.find(season => season.number === activeSeason)

    if (!season) {
      return []
    }

    return season.episodes
  }, [activeSeason, seasonsReverse])

  const renderSeason = React.useCallback(({ item: season }) => (
    <View style={styles.seasonContainer}>
      <Card
        onPress={() => setActiveSeason(season.number)}
        item={season}
      />

      <Typography
        style={styles.seasonNumber}
        color={activeSeason === season.number
          ? 'primary'
          : 'white'
        }
        variant={'overline'}
        emphasis={activeSeason === season.number
          ? 'high'
          : 'medium'
        }>
        {i18n.t('Season {{number}}', { number: season.number })}
      </Typography>
    </View>
  ), [activeSeason])

  return (
    <Animatable.View
      duration={constants.ANIMATION_DURATIONS.enteringScreen}
      animation={'fadeIn'}
      useNativeDriver>

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
        data={seasonsReverse}
        initialNumToRender={4}
        windowSize={4}
        renderItem={renderSeason}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 4 }} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
      />

      <View style={styles.container}>
        {episodes.map((episode) => (
          <Episode
            key={episode._id}
            hasAired={episode.firstAired < today || episode.torrents.length > 0}
            show={item}
            {...episode} />
        ))}
      </View>

    </Animatable.View>
  )
}

export default SeasonsAndEpisodes
