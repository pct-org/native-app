import React from 'react'
import { StyleSheet } from 'react-native'
import { useMutation } from '@apollo/client'

import { SearchForBetterEpisode, SearchForBetterMovie } from 'modules/GraphQL/SearchForBetterGraphQL'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import i18n from 'modules/i18n'
import useDownload from 'modules/hooks/useDownload'

import Divider from 'components/Divider'

import OptionsGroup from '../OptionsGroup'
import OptionsItem from '../OptionsItem'
import ItemTorrent from './ItemTorrent'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 0,
    marginTop: dimensions.UNIT * 2,
  },

  divider: {
    marginVertical: dimensions.UNIT * 2,
  },

})

export const ItemTorrents = ({ item, torrents }) => {
  const [download, downloadManager] = useDownload(item)
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

  const downloadRemoveLabel = React.useMemo(() => {
    if (download?.status === constants.STATUS_DOWNLOADING) {
      return i18n.t('Stop downloading')
    }

    if (download?.status === constants.STATUS_QUEUED) {
      return i18n.t('Remove from queue')
    }

    return i18n.t('Remove download')

  }, [download?.status])

  const handleDownloadTorrent = (torrent) => {
    downloadManager.startDownload(item, torrent)
  }

  const handleDeleteDownload = () => {
    downloadManager.removeDownload(download)
  }

  console.log('download in torrents', item._id, download, torrents)

  return (
    <OptionsGroup style={styles.root}>
      {torrents.length > 0 && (
        <>
          {torrents.map((torrent) => (
            <ItemTorrent
              item={item}
              torrent={torrent}
              disabled={loading}
              key={`${torrent.type}-${torrent.quality}`}
              download={download}
              startDownload={handleDownloadTorrent}
            />
          ))}

          <Divider style={styles.divider} />
        </>
      )}

      <OptionsItem
        loading={loading}
        disabled={loading}
        onPress={searchForBetter}
        icon={'magnify'}
        label={i18n.t('search for qualities')} />

      <OptionsItem
        disabled={!download}
        icon={'delete-outline'}
        label={downloadRemoveLabel}
        onPress={handleDeleteDownload}
      />

    </OptionsGroup>
  )
}

export default ItemTorrents
