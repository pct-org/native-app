import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { useMutation } from '@apollo/client'

import { SearchForBetterEpisode, SearchForBetterMovie } from 'modules/GraphQL/SearchForBetterGraphQL'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import Divider from 'components/Divider'

import SettingsGroup from './SettingsGroup'
import SettingsItem from './SettingsItem'
import SettingsButton from './SettingsButton'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 0,
    marginTop: dimensions.UNIT * 2,
  },

  divider: {
    marginVertical: dimensions.UNIT * 2,
  },

})

export const Torrents = ({ item, torrents }) => {
  const [searchForBetter, { loading }] = useMutation(
    item.type === constants.TYPE_EPISODE
      ? SearchForBetterEpisode
      : SearchForBetterMovie,
    {
      variables: {
        _id: item._id,
      },
    },
  )

  return (
    <SettingsGroup style={styles.root}>
      {torrents.map((torrent) => (
        <SettingsButton
          disabled={loading}
          key={`${torrent.type}-${torrent.quality}`}
          icon={'cloud-download'}
          label={torrent.quality}
          subLabel={`${torrent.provider}: seeds: ${torrent.seeds} - peers ${torrent.peers}`} />
      ))}

      <Divider style={styles.divider} />

      <SettingsButton
        loading={loading}
        disabled={loading}
        onPress={searchForBetter}
        icon={'magnify'}
        label={'Search for qualities'} />

      <SettingsButton
        disabled={!item.download.downloadQuality}
        icon={'magnify'}
        label={'Remove download'} />
    </SettingsGroup>
  )
}

export default Torrents
