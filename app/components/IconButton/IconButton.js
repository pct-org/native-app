import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import BaseButton from '../BaseButton'
import Typography from '../Typography'
import Icon from '../Icon'

export const styles = StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export const IconButton = ({ onPress, onLongPress, animatable, animatableStyle, buttonProps, children, ...rest }) => (
  <BaseButton onPress={onPress} onLongPress={onLongPress} {...buttonProps}>
    <Animatable.View
      {...animatable}
      style={[styles.container, animatableStyle]}>
      <Icon
        {...rest}
      />

      {children && (
        <Typography
          variant={'caption'}
          emphasis={'medium'}>
          {children}
        </Typography>
      )}
    </Animatable.View>
  </BaseButton>
)

IconButton.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  children: PropTypes.string,
  buttonProps: PropTypes.object,
  animatable: PropTypes.object,
}

IconButton.defaultProps = {
  buttonProps: {},
  animatable: {},
  onPress: null,
  children: null,
  animatableStyle: {},
}

export default IconButton
