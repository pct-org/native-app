import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'

import CoverGradient from 'components/CoverGradient'
import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import IconButton from 'components/IconButton'

const styles = StyleSheet.create({

  container: {
    height   : 400,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
  },

  mainImage: {
    height: '100%',
    width : '100%',
  },

  title: {
    position: 'absolute',
    bottom  : 20,
    left    : 8,
  },

  genres: {
    position: 'absolute',
    bottom  : 0,
    left    : 8,
  },

  playContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

})

export const Cover = ({ item, playMovie }) => (
  <View style={styles.container}>
    <Image
      style={styles.mainImage}
      source={{
        uri: item
          ? item.images.fanart.high
          : null,
      }}
    />

    <Overlay />

    <CoverGradient start={{ x: 0, y: 0.80 }} />

    {item && item.type === Constants.TYPE_MOVIE && (
      <View style={styles.playContainer}>
        <IconButton
          onPress={() => playMovie(item.torrents)}
          name={'play-circle-outline'}
          color={'#FFF'}
          size={80}/>
      </View>
    )}

    {item && (
      <Typography
        style={styles.title}
        variant={'title'}
        fontWeight={'black'}>
        {item.title}
      </Typography>
    )}

    {item && item.genres && (
      <Typography
        style={styles.genres}
        variant={'caption'}>
        {item.genres.join(' - ')}
      </Typography>
    )}
  </View>
)

Cover.propTypes = {
  item     : PropTypes.object,
  playMovie: PropTypes.func.isRequired,
}

Cover.defaultProps = {
  item: null,
}

export default Cover
