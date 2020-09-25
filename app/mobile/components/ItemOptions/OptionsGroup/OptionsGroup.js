import React from 'react'
import { View, StyleSheet } from 'react-native'

import dimensions from 'modules/dimensions'

import Divider from 'components/Divider'

export const styles = StyleSheet.create({

  root: {
    marginVertical: dimensions.UNIT * 2,
  },

})

export const OptionsGroup = ({ children, withDivider, style }) => {
  return (
    <>
      <View style={[styles.root, style]}>
        {children}
      </View>

      {withDivider && (
        <Divider />
      )}
    </>
  )
}

export default OptionsGroup
