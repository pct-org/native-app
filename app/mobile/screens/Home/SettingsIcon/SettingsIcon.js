import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import { navigate } from 'modules/RootNavigation'

import IconButton from 'components/IconButton'

export const styles = {

  root: {
    position: 'absolute',
    top: dimensions.UNIT + dimensions.STATUSBAR_HEIGHT,
    right: dimensions.UNIT * 2,
  }

}

export const SettingsIcon = () => (
  <View style={styles.root}>
    <IconButton
      onPress={() => navigate('Settings')}
      name={'settings'} />
  </View>
)

export default SettingsIcon
