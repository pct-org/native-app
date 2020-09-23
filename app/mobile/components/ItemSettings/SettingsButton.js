import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import BaseButton from 'components/BaseButton'
import Icon from 'components/Icon'
import * as Animatable from 'react-native-animatable'

import SettingsInner from './SettingsInner'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 7,
    paddingHorizontal: dimensions.UNIT * 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: dimensions.UNIT,
  },

  labels: {},

  label: {
    // flex: 1,
  },

})

export const SettingsItem = ({ style, disabled, onPress, ...rest }) => {
  return (
    <BaseButton
      rippleBorderless={false}
      onPress={onPress}
      disabled={disabled}
      style={[styles.root, style]}>
      <SettingsInner disabled={disabled} {...rest} />
    </BaseButton>
  )
}

export default SettingsItem
