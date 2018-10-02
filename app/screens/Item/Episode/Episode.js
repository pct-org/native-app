import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import posterHolderImage from 'images/posterholder.png'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin : 16,
  },

  posterWithTitle: {
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
  },

  iconContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  title: {
    marginLeft: 8,
  },

  summary: {
    marginTop: 8,
  },
})

export const Episode = ({ playItem, hasTorrents, title, summary, images, torrents }) => (
  <View style={styles.container}>

    <View style={styles.posterWithTitle}>
      <TouchableNativeFeedback
        onPress={() => hasTorrents ? playItem(torrents) : null}
        background={TouchableNativeFeedback.Ripple()}>
        <View>
          {images.poster.thumb && (
            <Image
              source={{ uri: images.poster.thumb }}
              style={{ width: 150, height: 100 }} />
          )}

          {!images.poster.thumb && (
            <Image
              source={posterHolderImage}
              style={{ width: 150, height: 100 }} />
          )}

          <View style={styles.iconContainer}>
            <Overlay />

            <Icon
              iconStyle={{ margin: 0 }}
              backgroundColor={'transparent'}
              borderRadius={0}
              name={hasTorrents ? 'play-circle-outline' : 'highlight-off'}
              color={hasTorrents ? '#FFF' : 'red'}
              size={60} />
          </View>
        </View>
      </TouchableNativeFeedback>

      <Typography style={styles.title}>
        {title}
      </Typography>
    </View>

    <Typography style={styles.summary} variant={'caption'}>
      {summary}
    </Typography>

  </View>
)

Episode.propTypes = {}

Episode.defaultProps = {}

export default Episode
