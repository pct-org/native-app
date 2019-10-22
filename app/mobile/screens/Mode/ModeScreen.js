import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar, FlatList, InteractionManager } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import MoviesQuery from 'modules/GraphQL/MoviesQuery'
import ShowsQuery from 'modules/GraphQL/ShowsQuery'

import Card from 'components/Card'
import { BookmarksQuery } from './ModeQuery'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    marginTop: dimensions.UNIT / 2,
    marginLeft: dimensions.UNIT / 2,
    marginRight: dimensions.UNIT / 2,
  },

})

export const Mode = ({ mode, navigation }) => {
  const [executeQuery, { loading, data, fetchMore }] = useLazyQuery(
    mode === 'movies'
      ? MoviesQuery
      : mode === 'shows'
      ? ShowsQuery
      : BookmarksQuery,
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

  return (
    <View style={styles.root}>

      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0.20)'}
        animated />

      <FlatList
        removeClippedSubviews
        contentContainerStyle={styles.container}
        data={items.length > 0
          ? items
          : Array(24).fill({ loading: true })
        }
        scrollEnabled={items.length > 0}
        numColumns={4}
        initialNumToRender={24}
        windowSize={24}
        renderItem={renderCard}
        ListHeaderComponent={() => <View style={{ marginTop: StatusBar.currentHeight }} />}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 2 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={items.length > 0
          ? fetchMoreUpdateQuery(mode, data, fetchMore)
          : null
        }
        onEndReachedThreshold={dimensions.CARD_HEIGHT_SMALL * 4}
      />

    </View>
  )
}

Mode.propTypes = {
  mode: PropTypes.oneOf(['movies', 'shows', 'bookmarks']).isRequired,
}

export default Mode
