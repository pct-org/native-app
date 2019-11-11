import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ImageBackground, FlatList, InteractionManager } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import MoviesQuery from 'modules/GraphQL/MoviesQuery'
import ShowsQuery from 'modules/GraphQL/ShowsQuery'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import Card from 'components/Card'
import Typography from 'components/Typography'
import BackgroundImage from 'tv/components/BackgroundImage'
import Menu from 'tv/components/Menu'

import ActiveItemInfo from './ActiveItemInfo'
import { BookmarksQuery } from './ModeQuery'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  container: {
    position: 'absolute',
    bottom: dimensions.UNIT * 2,
    left: dimensions.TV_LEFT - (dimensions.UNIT / 2),
    paddingRight: dimensions.CARD_WIDTH_SMALL,
  },

  header: {
    position: 'absolute',
    bottom: (dimensions.UNIT * 2.5) + dimensions.CARD_HEIGHT_SMALL,
    left: dimensions.TV_LEFT,
    paddingRight: dimensions.CARD_WIDTH_SMALL,
  },

  noResults: {
    marginTop: dimensions.UNIT * 2,
    textAlign: 'center',
  },
})

export const Mode = ({ mode, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0)
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

  const flatList = createRef()

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

  const renderCard = ({ item, index }) => {
    const empty = item.loading

    return (
      <Card
        variant={'small'}
        empty={empty}
        item={item}
        hasTVPreferredFocus={index === 0}
        forceOverlay={index < activeIndex}
        isTvSelected={activeIndex === index}
        onFocus={() => {
          if (flatList.current && !empty && index !== activeIndex) {
            flatList.current.scrollToIndex({
              index,
              viewPosition: 0,
              animated: true,
            })

            setActiveIndex(index)
          }
        }}
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

  const activeItem = items.find((item, index) => index === activeIndex)

  return (
    <Menu style={styles.root}>

      {activeItem && (
        <BackgroundImage
          uri={activeItem.images.backdrop.full}
        />
      )}

      {activeItem && (
        <ActiveItemInfo {...activeItem} />
      )}

      <Typography
        variant={'subtitle1'}
        fontWeight={'medium'}
        emphasis={'high'}
        style={styles.header}>
        {i18n.t(mode)}
      </Typography>

      <FlatList
        horizontal
        removeClippedSubviews
        ref={flatList}
        contentContainerStyle={styles.container}
        data={items.length === 0
          ? Array(24).fill({ loading: true })
          : items
        }
        scrollEnabled={items.length > 0}
        initialNumToRender={10}
        windowSize={10}
        renderItem={renderCard}
        ListEmptyComponent={renderNothingFound}
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
        onEndReachedThreshold={dimensions.CARD_WIDTH_SMALL * 10}
      />

    </Menu>
  )
}

Mode.propTypes = {
  mode: PropTypes.oneOf(['movies', 'shows', 'bookmarks']).isRequired,
}

export default Mode
