import React from 'react'
import { View, StyleSheet } from 'react-native'

import dimensions from 'modules/dimensions'
import useCorrect from 'modules/useCorrect'

import Divider from 'components/Divider'

export interface Props {

  withDivider?: boolean

  style?: any

}

export const styles = StyleSheet.create({

  root: {
    marginVertical: useCorrect(
      dimensions.UNIT * 2,
      null,
      0
    )
  }

})

export const OptionsGroup: React.FC<Props> = ({
  children,
  withDivider,
  style
}) => (
  <>
    <View style={[styles.root, style]}>
      {children}
    </View>

    {withDivider && (
      <Divider />
    )}
  </>
)

export default OptionsGroup
