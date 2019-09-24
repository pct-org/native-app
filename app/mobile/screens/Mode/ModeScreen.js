import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CardList from 'components/CardList'
import FullScreenLoading from 'components/FullScreenLoading'

import { MoviesQuery, ShowsQuery, BookmarksQuery } from './ModeQuery'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    position: 'relative',
  },

})

export const Mode = ({ mode }) => {
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

  console.log(mode, items)
  return (
    <View style={styles.root}>

      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0.20)'}
        animated />

      <FullScreenLoading enabled={loading && items.length === 0} />

      <CardList
        items={items}
        ListHeaderComponent={() => <View style={{ marginTop: dimensions.UNIT * 2 }} />}
        onEndReached={fetchMoreUpdateQuery(mode, data, fetchMore)}
      />

    </View>
  )
}

Mode.propTypes = {
  mode: PropTypes.oneOf(['movies', 'shows', 'bookmarks']).isRequired,
}

export default Mode
