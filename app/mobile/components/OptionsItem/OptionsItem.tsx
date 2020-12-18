import React from 'react'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import BaseButton from 'components/BaseButton'

import OptionsItemInner, { Props as OptionsItemInnerProps } from './OptionsItemInner'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 7,
    paddingHorizontal: dimensions.UNIT * 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

})

export interface Props extends OptionsItemInnerProps {

  style?: object

  disabled?: boolean

  onPress?: () => void

}

export const OptionsItem: React.FC<Props> = ({
  style,
  disabled,
  onPress,
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
        style={[styles.root, style]}>
        <OptionsItemInner
          disabled={disabled}
          {...rest} />
      </BaseButton>
    )
  }
}

export default OptionsItem
