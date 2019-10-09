import Card from 'components/Card/Card'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import MoviesQuery from 'modules/GraphQL/MoviesQuery'
import ShowsQuery from 'modules/GraphQL/ShowsQuery'

import { BookmarksQuery } from './ModeQuery'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    position: 'relative',
  },

  container: {
    marginTop: dimensions.UNIT / 2,
    marginLeft: dimensions.UNIT / 2,
    marginRight: dimensions.UNIT / 2,
  },

})

export const Mode = ({ mode, navigation }) => {
  const { loading, data, fetchMore } = useQuery(
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

  const items = !data || !data[mode]
    ? []
    : data[mode]

  const renderCard = ({ item }) => {
    const empty = !item

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
        data={items.length === 0
          ? Array(24).fill()
          : items
        }
        scrollEnabled={items.length > 0}
        numColumns={4}
        initialNumToRender={24}
        windowSize={28}
        contentContainerStyle={styles.container}
        renderItem={renderCard}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        ListHeaderComponent={() => <View style={{ marginTop: StatusBar.currentHeight }} />}
        ListFooterComponent={() => <View style={{ marginBottom: dimensions.UNIT * 2 }} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={items.length > 0
          ? fetchMoreUpdateQuery(mode, data, fetchMore)
          : null
        }
      />

    </View>
  )
}

Mode.propTypes = {
  mode: PropTypes.oneOf(['movies', 'shows', 'bookmarks']).isRequired,
}

export default Mode
