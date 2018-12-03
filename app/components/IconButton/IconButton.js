import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import BaseButton from '../BaseButton'
import Typography from '../Typography'

export const styles = StyleSheet.create({

  container: {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',

    margin: 8,
  },

})

export const IconButton = ({ onPress, buttonProps, children, ...rest }) => (
  <BaseButton onPress={onPress} {...buttonProps}>
    <View style={styles.container}>
      <Icon
        {...rest}
      />

      {children && (
        <Typography variant={'caption'}>
          {children}
        </Typography>
      )}
    </View>
  </BaseButton>
)

IconButton.propTypes = {
  onPress    : PropTypes.func,
  children   : PropTypes.string,
  buttonProps: PropTypes.object,
}

IconButton.defaultProps = {
  buttonProps: {},
  onPress    : null,
  children   : null,
}

export default IconButton
