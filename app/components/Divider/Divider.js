import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { styles as containerStyles } from 'components/Container/Container'

export const styles = StyleSheet.create({

  root: {
    height: 1,
    width: '100%',
  },

})

export const Divider = ({ style }) => (
  <View
    style={[styles.root, style]}
    pointerEvents={'box-none'}>
    <View
      style={[
        containerStyles.elevationRoot,
        containerStyles.elevation3,
      ]}
      pointerEvents={'none'} />
  </View>
)

Divider.propTypes = {
  style: PropTypes.object,
}

Divider.defaultProps = {
  style: {},
}

export default Divider
