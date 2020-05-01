import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, StatusBar, FlatList, InteractionManager, RefreshControl } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import withDownloadManager from 'modules/DownloadManager/withDownloadManager'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import Typography from 'components/Typography'
import ItemInfo from 'mobile/components/ItemInfo'

import { DownloadsQuery } from './DownloadsQuery'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    marginTop: dimensions.UNIT / 2,
    paddingBottom: dimensions.UNIT * 2,
  },

  noResults: {
    marginTop: dimensions.UNIT * 2,
    textAlign: 'center',
  },
})

export const DownloadsScreen = ({ navigation, downloadManager }) => {
  const flatListRef = useRef(null)
  const [executeQuery, { data, loading, fetchMore }] = useLazyQuery(
    DownloadsQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  useEffect(() => {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeQuery()
    })
  }, [])

  const items = !data
    ? []
    : data.downloads

  const renderCard = ({ item }) => {
    const empty = item.loading

    return (
      <ItemInfo
        empty={empty}
        item={item.episode || item.movie}
        variant={'playable'}
        quality={item.quality}
        status={item.status}
        truncateSynopsis
      />
    )
  }

  const renderNothingFound = () => (
    <Typography
      style={styles.noResults}
      variant={'subtitle1'}>
      {i18n.t('No results found')}
    </Typography>
  )

  return (
    <View style={styles.root}>

      <StatusBar
        backgroundColor={colors.STATUS_BAR_TRANSPARENT}
        animated />

      <FlatList
        removeClippedSubviews
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            refreshing={items.length > 0 && loading}
            onRefresh={() => executeQuery()}
            colors={[colors.PRIMARY_COLOR_200]}
            progressBackgroundColor={colors.BACKGROUND_TABS}
          />
        }
        data={items.length === 0
          ? Array(8).fill({ loading: true })
          : items
        }
        scrollEnabled={items.length > 0}
        numColumns={1}
        initialNumToRender={8}
        windowSize={8}
        renderItem={renderCard}
        ListHeaderComponent={() => (
          <View style={{
            marginTop: dimensions.STATUSBAR_HEIGHT,
          }} />
        )}
        ListEmptyComponent={renderNothingFound}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 2 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={items.length > 0
          ? fetchMoreUpdateQuery('downloads', data, fetchMore)
          : null
        }
        onEndReachedThreshold={dimensions.CARD_HEIGHT_SMALL * 4}
        contentContainerStyle={styles.container}
      />

    </View>
  )
}

DownloadsScreen.propTypes = {}

export default withDownloadManager(DownloadsScreen)
