import Typography from 'components/Typography'
import React, { useEffect } from 'react'
import { StyleSheet, View, Linking, InteractionManager } from 'react-native'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import Orientation from 'react-native-orientation'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import MainCover from 'mobile/components/MainCover'

import { MovieQuery, ShowQuery, AddBookmarkMutation } from './ItemGraphQL'

import Bookmarked from './Bookmarked'
import SeasonsAndEpisodes from './SeasonsAndEpisodes'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,

    minHeight: 70,
  },

  icon: {
    minWidth: 80,
    textAlign: 'center',
  },

  synopsis: {
    marginTop: dimensions.UNIT * 3,
    marginBottom: dimensions.UNIT * 3,
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
  },
})

export const Item = ({ navigation: { state: { params } } }) => {
  const Query = params.type === 'movie'
    ? MovieQuery
    : ShowQuery

  const [executeQuery, { called: queryCalled, loading: itemLoading, data, error }] = useLazyQuery(
    Query,
    {
      variables: {
        _id: params._id,
      },
    },
  )

  useEffect(() => {
    Orientation.lockToPortrait()

    // Execute the query after the component is done navigation
    //InteractionManager.runAfterInteractions(() => {
    // Execute the query
    executeQuery()
    //})
  }, [])

  const loading = itemLoading || !data
  const item = loading ? null : data.item

  console.log('item', error, loading, item)

  const handleToggleWatched = () => {

  }

  const handleTrailer = () => {

  }

  return (
    <View style={styles.root}>

      <ScrollViewWithStatusBar>

        <MainCover
          empty={loading}
          item={item} />

        {/*<View style={styles.iconsContainer}>*/}
        {/*  {!loading && (*/}
        {/*    <Bookmarked*/}
        {/*      styles={styles}*/}
        {/*      Query={Query}*/}
        {/*      {...item}*/}
        {/*    />*/}
        {/*  )}*/}

        {/*  /!*{!loading && item.type === constants.TYPE_MOVIE && (*!/*/}
        {/*  /!*  <IconButton*!/*/}
        {/*  /!*    animatable={{*!/*/}
        {/*  /!*      animation: 'fadeIn',*!/*/}
        {/*  /!*      useNativeDriver: true,*!/*/}
        {/*  /!*    }}*!/*/}
        {/*  /!*    style={[styles.icon, { minWidth: 95 }]}*!/*/}
        {/*  /!*    onPress={handleToggleWatched}*!/*/}
        {/*  /!*    name={item.watched.complete*!/*/}
        {/*  /!*      ? 'eye-off-outline'*!/*/}
        {/*  /!*      : 'eye-outline'*!/*/}
        {/*  /!*    }*!/*/}
        {/*  /!*    color={colors.ICON_COLOR}*!/*/}
        {/*  /!*    size={dimensions.ITEM_ICONS}>*!/*/}
        {/*  /!*    {i18n.t(item.watched.complete ? 'Mark Unwatched' : 'Mark Watched')}*!/*/}
        {/*  /!*  </IconButton>*!/*/}
        {/*  /!*)}*!/*/}

        {/*  /!*{!loading && item.trailer && (*!/*/}
        {/*  /!*  <IconButton*!/*/}
        {/*  /!*    animatable={{*!/*/}
        {/*  /!*      animation: 'fadeIn',*!/*/}
        {/*  /!*      useNativeDriver: true,*!/*/}
        {/*  /!*    }}*!/*/}
        {/*  /!*    style={styles.icon}*!/*/}
        {/*  /!*    onPress={handleTrailer}*!/*/}
        {/*  /!*    name={'youtube'}*!/*/}
        {/*  /!*    color={colors.ICON_COLOR}*!/*/}
        {/*  /!*    size={dimensions.ITEM_ICONS}>*!/*/}
        {/*  /!*    {i18n.t('Trailer')}*!/*/}
        {/*  /!*  </IconButton>*!/*/}
        {/*  /!*)}*!/*/}
        {/*</View>*/}

        {item && (
          <View style={styles.synopsis}>
            <Typography variant={'body2'}>
              {item.synopsis}
            </Typography>
          </View>
        )}

        {item && item.type === constants.TYPE_SHOW && item.seasons.length > 0 && (
          <SeasonsAndEpisodes
            item={item}
          />
        )}

      </ScrollViewWithStatusBar>

    </View>
  )
}

export default Item
