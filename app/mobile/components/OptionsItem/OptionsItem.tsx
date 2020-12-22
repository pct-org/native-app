import React from 'react'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import useCorrect from 'modules/useCorrect'
import BaseButton from 'components/BaseButton'

import OptionsItemInner, { Props as OptionsItemInnerProps } from './OptionsItemInner'

export const styles = StyleSheet.create({

  root: {
    marginVertical: useCorrect(
      7,
      null,
      dimensions.UNIT / 4
    ),
    paddingHorizontal: useCorrect(
      dimensions.UNIT * 2,
      null,
      dimensions.UNIT
    ),
    paddingVertical: useCorrect(
      0,
      null,
      dimensions.UNIT / 2
    ),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

})

export interface Props extends OptionsItemInnerProps {

  style?: any

  disabled?: boolean

  onPress?: () => void

  buttonProps?: any
}

export const OptionsItem: React.FC<Props> = ({
  style = {},
  disabled = false,
  onPress,
  buttonProps = {},
  ...rest
}) => {
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
        {...buttonProps}>
        <View style={[styles.root, style]}>
          <OptionsItemInner
            disabled={disabled}
            {...rest} />
        </View>
      </BaseButton>
    )
  }
}

export default OptionsItem
