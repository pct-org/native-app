import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar, Animated, InteractionManager } from 'react-native'
import { useLazyQuery } from '@apollo/client'
import { useCollapsibleStack } from 'react-navigation-collapsible'
import { getDefaultHeaderHeight } from 'react-navigation-collapsible/lib/src/utils'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import useBackButton from 'modules/hooks/useBackButton'
import { MoviesModeQuery } from 'modules/GraphQL/MoviesGraphQL'
import { ShowsModeQuery } from 'modules/GraphQL/ShowsGraphQL'
import { BookmarksModeQuery } from 'modules/GraphQL/BookmarksGraphQL'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import Card from 'components/Card'
import Typography from 'components/Typography'

import SearchBar from './SearchBar'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    marginTop: dimensions.UNIT / 2,
    marginLeft: dimensions.UNIT / 2,
    marginRight: dimensions.UNIT / 2,
    paddingBottom: dimensions.UNIT * 2,
  },

  noResults: {
    marginTop: dimensions.UNIT * 2,
    textAlign: 'center',
  },
})

export const useMode = (mode) => React.useMemo(() => {
  switch (mode) {
    case constants.MODE_MOVIES:
      return MoviesModeQuery

    case constants.MODE_SHOWS:
      return ShowsModeQuery

    case constants.MODE_BOOKMARKS:
      return BookmarksModeQuery

    default:
      return null
  }
}, [mode])

export const Mode = ({ mode, navigation }) => {
  const flatListRef = useRef(null)
  const modeQuery = useMode(mode)
  const [sort, setSorting] = useState(undefined)
  const [filter, setFilter] = useState(undefined)
  const [query, setQuery] = useState(undefined)

  const [executeQuery, { loading, data, fetchMore }] = useLazyQuery(
    modeQuery,
    {
      variables: {
        offset: 0,
        query,
        sort,
        filter,
      },
    },
  )

  useBackButton(() => {
    if ((query?.trim()?.length > 0 || filter || sort) && navigation.isFocused()) {
      setQuery(null)
      setFilter(undefined)
      setSorting(undefined)

      return true
    }

    return false
  })

  const { onScroll, scrollIndicatorInsetTop } = useCollapsibleStack()

  useEffect(() => {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeQuery()
    })
  }, [])

  const items = !data || !data[mode]
    ? []
    : data[mode]

  const renderCard = ({ item }) => {
    const empty = item.loading

    return (
      <Card
        variant={'small'}
        empty={empty}
        item={item}
        onPress={() => {
          if (!empty && !loading) {
            navigation.navigate('Item', item)
          }
        }}
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

      <Animated.FlatList
        removeClippedSubviews
        ref={flatListRef}
        data={items.length === 0 && !query
          ? Array(24).fill({ loading: true })
          : items
        }
        scrollEnabled={items.length > 0}
        numColumns={4}
        initialNumToRender={24}
        windowSize={24}
        renderItem={renderCard}
        ListEmptyComponent={renderNothingFound}
        ListHeaderComponent={() => (
          <View style={{
            marginTop: dimensions.STATUSBAR_HEIGHT + +dimensions.SEARCH_BAR_HEIGHT + dimensions.UNIT,
          }} />
        )}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 2 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={mode !== 'bookmarks'
          ? fetchMoreUpdateQuery(mode, data, fetchMore)
          : null
        }
        onEndReachedThreshold={3}
        onScroll={onScroll}
        contentContainerStyle={styles.container}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop - getDefaultHeaderHeight(true) }}
      />

      <SearchBar
        flatListRef={flatListRef}
        searchedQuery={query}
        search={setQuery}
        mode={mode}
        setSorting={setSorting}
        setFilter={setFilter}
      />

    </View>
  )
}

Mode.propTypes = {
  mode: PropTypes.oneOf(['movies', 'shows', 'bookmarks']).isRequired,
}

export default Mode
