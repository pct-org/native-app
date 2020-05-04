import React, { useEffect } from 'react'
import { StyleSheet, View, InteractionManager, Linking } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import Orientation from 'react-native-orientation'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Container from 'components/Container'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import IconButton from 'components/IconButton'
import Typography from 'components/Typography'
import QualitySelector from 'mobile/components/QualitySelector'
import MainCover from 'mobile/components/MainCover'

import { MovieQuery, ShowQuery } from './ItemGraphQL'

import Bookmarked from './Bookmarked'
import SeasonsAndEpisodes from './SeasonsAndEpisodes'
import WatchedBar from './WatchedBar'

const styles = StyleSheet.create({

  root: {
    flex: 1,
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: dimensions.UNIT * 3,
    marginBottom: dimensions.UNIT * 3,
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
  },

  icon: {
    marginLeft: dimensions.UNIT * 5,
    marginRight: dimensions.UNIT * 5,
    textAlign: 'center',
  },

  iconDownload: {
    marginTop: dimensions.UNIT / 2,
  },

  synopsis: {
    marginBottom: dimensions.UNIT * 3,
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
  },

})

export const Item = ({ route: { params } }) => {
  const Query = params.type === 'movie'
    ? MovieQuery
    : ShowQuery

  const [executeQuery, { loading: itemLoading, data }] = useLazyQuery(
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
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeQuery()
    })
  }, [])

  const loading = itemLoading || !data
  const item = loading ? null : data.item

  const handleToggleWatched = () => {

  }

  const handleTrailer = () => {
    if (item && item.trailer) {
      Linking.openURL(item.trailer)
    }
  }

  return (
    <Container style={styles.root}>

      <ScrollViewWithStatusBar>

        <MainCover
          empty={loading}
          item={item} />

        <View style={styles.iconsContainer}>
          {!loading && item.type === constants.TYPE_MOVIE && (
            <QualitySelector
              item={item}
              variant={constants.TYPE_DOWNLOAD}
              style={{
                ...styles.icon,
                ...styles.iconDownload,
              }}
            />
          )}

          {!loading && (
            <Bookmarked
              style={styles.icon}
              Query={Query}
              {...item}
            />
          )}

          {!loading && item.trailer && (
            <IconButton
              animatable={{
                animation: 'fadeIn',
                useNativeDriver: true,
              }}
              style={styles.icon}
              onPress={handleTrailer}
              name={'youtube'}
              color={'primary'}
              emphasis={'medium'}
              size={dimensions.ICON_SIZE_MEDIUM} />
          )}
        </View>

        <WatchedBar item={item} />

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

        <View style={styles.synopsis}>
          <Typography variant={'body2'}>
            {item?.synopsis}
          </Typography>
        </View>

        {item && item.type === constants.TYPE_SHOW && item.seasons.length > 0 && (
          <SeasonsAndEpisodes
            item={item}
          />
        )}

      </ScrollViewWithStatusBar>

    </Container>
  )
}

export default Item
