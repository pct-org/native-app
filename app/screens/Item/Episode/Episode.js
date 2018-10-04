import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import posterHolderImage from 'images/posterholder.png'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'

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

export const Episode = ({ playItem, hasTorrents, title, summary, images, torrents }) => {
  const handlePlayItem = () => {
    if (hasTorrents) {
      playItem(torrents)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.posterWithTitle}>
        <BaseButton onPress={handlePlayItem}>
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
        </BaseButton>

        {title && (
          <Typography style={styles.title}>
            {title}
          </Typography>
        )}
      </View>

      {summary && (
        <Typography style={styles.summary} variant={'caption'}>
          {summary}
        </Typography>
      )}

    </View>
  )
}

Episode.propTypes = {
  playItem   : PropTypes.func.isRequired,
  title      : PropTypes.string.isRequired,
  images     : PropTypes.object.isRequired,
  torrents   : PropTypes.object.isRequired,
  summary    : PropTypes.string,
  hasTorrents: PropTypes.bool,
}

Episode.defaultProps = {
  summary    : null,
  hasTorrents: false,
}

export default Episode
