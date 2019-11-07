import Card from 'components/Card'
import Typography from 'components/Typography'
import React, { useEffect } from 'react'
import { StyleSheet, View, InteractionManager, Linking } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import IconButton from 'components/IconButton'
import QualitySelector from 'mobile/components/QualitySelector'
import MainCover from 'mobile/components/MainCover'
import BackgroundImage from 'tv/components/BackgroundImage'

import { MovieQuery, ShowQuery } from './ItemGraphQL'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  infoRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  infoContainer: {
    height: dimensions.getHeight(450),
    width: dimensions.getHeight(1200),
    // backgroundColor: 'pink',
    flexDirection: 'row',
  },

  info: {
    flex: 1,
    // backgroundColor: 'blue',
  },

  card: {
    justifyContent: 'center',
  },
})

export const Item = ({ navigation, navigation: { state: { params } } }) => {
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
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeQuery()
    })
  }, [])

  const loading = itemLoading || !data
  const item = loading ? null : data.item
  const images = navigation.getParam('images')

  const handleToggleWatched = () => {

  }

  const handleTrailer = () => {
    if (item && item.trailer) {
      Linking.openURL(item.trailer)
    }
  }

  return (
    <View style={styles.root}>

      <BackgroundImage
        withBlur
        uri={images.backdrop.full}
      />

      <View style={styles.infoRoot}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
          </View>

          <View style={styles.card}>
            <Card
              variant={'big'}
              item={{
                _id: navigation.getParam('_id'),
                images,
              }}
              hasTVPreferredFocus
              // forceOverlay
              overlayVariant={'default'}
              // isTvSelected
            />
          </View>
          {/*<View style={styles.synopsis}>*/}
          {/*  <Typography variant={'body2'}>*/}
          {/*    {item.synopsis}*/}
          {/*  </Typography>*/}
          {/*</View>*/}
        </View>
      </View>

    </View>
  )
}

export default Item
