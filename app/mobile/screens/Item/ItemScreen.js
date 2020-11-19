import React, { useEffect } from 'react'
import { StyleSheet, View, InteractionManager, Linking } from 'react-native'
import { useLazyQuery } from '@apollo/client'
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Container from 'components/Container'
import ScrollViewWithStatusBar from 'components/ScrollViewWithStatusBar'
import IconButton from 'components/IconButton'
import Typography from 'components/Typography'
import ItemOptions from 'mobile/components/ItemOptions'
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
  const [executeQuery, { loading: itemLoading, data }] = useLazyQuery(
    params.type === 'movie'
      ? MovieQuery
      : ShowQuery,
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
  const item = loading ? null : data[params.type]

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
          {!loading && (
            <Bookmarked
              style={styles.icon}
              {...item}
            />
          )}

          {!loading && item.trailer && (
            <IconButton
              animatable={{
                animation: 'fadeIn',
                useNativeDriver: true,
                duration: constants.ANIMATION_DURATIONS.enteringScreen,
              }}
              style={styles.icon}
              onPress={handleTrailer}
              name={'youtube'}
              color={'primary'}
              emphasis={'medium'}
              size={dimensions.ICON_SIZE_MEDIUM} />
          )}

          {!loading && item.type === constants.TYPE_MOVIE && (
            <ItemOptions
              item={item}
              animatable={{
                animation: 'fadeIn',
                useNativeDriver: true,
                duration: constants.ANIMATION_DURATIONS.enteringScreen,
              }}
              style={{
                ...styles.icon,
                ...styles.iconDownload,
              }}
            />
          )}
        </View>

        <WatchedBar item={item} />

        {item && (
          <Animatable.View
            duration={constants.ANIMATION_DURATIONS.enteringScreen}
            animation={'fadeIn'}
            style={styles.synopsis}
            useNativeDriver>
            <Typography variant={'body2'}>
              {item.synopsis}
            </Typography>
          </Animatable.View>
        )}

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
