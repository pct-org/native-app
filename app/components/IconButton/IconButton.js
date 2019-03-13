import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import BaseButton from '../BaseButton'
import Typography from '../Typography'

export const styles = StyleSheet.create({

  container: {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
  },

})

export const IconButton = ({ onPress, animatable, buttonProps, children, ...rest }) => (
  <BaseButton onPress={onPress} {...buttonProps}>
    <Animatable.View {...animatable} style={styles.container}>
      <Icon
        {...rest}
      />

      {children && (
        <Typography variant={'caption'}>
          {children}
        </Typography>
      )}
    </Animatable.View>
  </BaseButton>
)

IconButton.propTypes = {
  onPress    : PropTypes.func,
  children   : PropTypes.string,
  buttonProps: PropTypes.object,
  animatable : PropTypes.object,
}

IconButton.defaultProps = {
  buttonProps: {},
  animatable : {},
  onPress    : null,
  children   : null,
}

export default IconButton
