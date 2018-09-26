import CoverGradient from 'components/CoverGradient/CoverGradient'
import Typography from 'components/Typography/Typography'
import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({

  container: {
    height   : 400,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
  },

  overlay: {
    position       : 'absolute',
    top            : 0,
    right          : 0,
    bottom         : 0,
    left           : 0,
    backgroundColor: 'black',
    opacity        : 0.3,
  },

  mainImage: {
    height: '100%',
    width : '100%',
  },

  title: {
    position: 'absolute',
    bottom  : 20,
    left    : 10,
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

export const Cover = ({ item, playItem }) => (
  <View style={styles.container}>
    <Image
      style={styles.mainImage}
      source={{ uri: item.images.fanart.high }}
    />

    <View style={styles.overlay} />

    <CoverGradient start={{ x: 0, y: 0.80 }} />

    <View style={styles.playContainer}>
      <Icon.Button
        activeOpacity={0.1}
        onPress={playItem}
        iconStyle={{ margin: 0 }}
        backgroundColor={'transparent'}
        borderRadius={0}
        name={'play-circle-outline'}
        color={'#FFF'}
        size={80} />
    </View>

    <Typography
      style={styles.title}
      variant={'title'}>
      {item.title}
    </Typography>
  </View>
)

Cover.propTypes = {
  item: PropTypes.object.isRequired,
}

Cover.defaultProps = {}

export default Cover
