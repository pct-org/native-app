import React from 'react'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import BaseButton from 'components/BaseButton'

import OptionsItemInner from './OptionsItemInner'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 7,
    paddingHorizontal: dimensions.UNIT * 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

})

export const OptionsItem = ({ style, disabled, onPress, ...rest }) => {
  if (disabled || !onPress) {
    return (
      <View style={[styles.root, style]}>
        <OptionsItemInner
          disabled={disabled}
          {...rest} />
      </View>
    )

  } else {
    return (
      <BaseButton
        rippleBorderless={false}
        onPress={onPress}
        disabled={disabled}
        style={[styles.root, style]}>
        <OptionsItemInner
          disabled={disabled}
          {...rest} />
      </BaseButton>
    )
  }
}

export default OptionsItem
