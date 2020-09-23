import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Typography from 'components/Typography'
import TextButton from 'components/TextButton'

const styles = StyleSheet.create({

  quality: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export const Quality = ({ torrent, handleQualityPress }) => (
  <Animatable.View
    style={styles.quality}
    animation={'fadeIn'}
    duration={200}
    useNativeDriver>
    <TextButton
      component={TouchableNativeFeedback}
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
  </Animatable.View>
)

Quality.propTypes = {
  torrent: PropTypes.object.isRequired,
  handleQualityPress: PropTypes.func.isRequired,
}

export default Quality
