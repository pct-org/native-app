import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Typography from 'components/Typography'
import TextButton from 'components/TextButton'

import QualitySelector from '../QualitySelector'

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: (dimensions.SCREEN_HEIGHT / 2) + dimensions.UNIT * 3,
    display: 'flex',
    alignItems: 'center',
  },

  qualitiesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: dimensions.UNIT * 2,
  },

  quality: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qualitySize: {},

})

export const Qualities = ({ variant, item, handleQualityPress }) => (
  <Animatable.View
    animation={'fadeIn'}
    duration={200}
    style={styles.container}
    useNativeDriver>
    <Typography variant={'subtitle1'}>
      {i18n.t(variant === QualitySelector.VARIANT_PLAY
        ? 'Watch in'
        : 'Download in',
      )}
    </Typography>

    <View style={styles.qualitiesContainer}>
      {item && item.torrents && item.torrents.map((torrent) => (
        <View
          key={torrent.quality}

          style={styles.quality}>
          <TextButton
            color={'primary'}
            onPress={() => {
              handleQualityPress(torrent)
            }}>
            {torrent.quality}
          </TextButton>

          <Typography
            variant={'caption'}
            emphasis={'medium'}>
            {torrent.sizeString}
          </Typography>
        </View>
      ))}
    </View>
  </Animatable.View>
)

Qualities.propTypes = {
  item: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['play', 'download']),
  handleQualityPress: PropTypes.func.isRequired,
}

export default Qualities
