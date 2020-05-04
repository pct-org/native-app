import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'

import BaseButton from '../BaseButton'
import Typography from '../Typography'
import Icon from '../Icon'

export const styles = StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: -(dimensions.UNIT / 2)
  }
})

export const IconButton = ({ onPress, onLongPress, onFocus, onBlur, animatable, animatableStyle, buttonProps, children, ...rest }) => (
  <BaseButton
    onPress={onPress}
    onLongPress={onLongPress}
    onFocus={onFocus}
    onBlur={onBlur}

    {...buttonProps}>
    <Animatable.View
      {...animatable}
      style={[styles.container, animatableStyle]}>
      <Icon
        {...rest}
      />

      {children && (
        <Typography
          style={styles.text}
          variant={'captionSmall'}
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
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.string,
  buttonProps: PropTypes.object,
  animatable: PropTypes.object,
  size: PropTypes.number,
}

IconButton.defaultProps = {
  buttonProps: {},
  animatable: {},
  onPress: null,
  children: null,
  animatableStyle: {},
  onFocus: null,
  onBlur: null,
  size: dimensions.ICON_SIZE_DEFAULT
}

export default IconButton
