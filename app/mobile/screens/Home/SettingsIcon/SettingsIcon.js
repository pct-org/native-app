import React from 'react'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import { navigate } from 'modules/RootNavigation'

import IconButton from 'components/IconButton'

export const styles = {

  root: {
    position: 'absolute',
    top: dimensions.UNIT + dimensions.STATUSBAR_HEIGHT,
    right: dimensions.UNIT * 2,
  },

}

export const SettingsIcon = () => (
  <Animatable.View
    duration={constants.ANIMATION_DURATIONS.enteringScreen}
    animation={'fadeIn'}
    style={styles.root}
    useNativeDriver>
    <IconButton
      onPress={() => navigate('Settings')}
      name={'cog'} />
  </Animatable.View>
)

export default SettingsIcon
