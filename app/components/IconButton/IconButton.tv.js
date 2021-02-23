import dimensions from 'modules/dimensions'
import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'

import colors from 'modules/colors'

import BaseIconButton from './IconButton'

export const styles = {

  root: {
    borderWidth: 1,
    borderColor: colors.TRANSPARENT,

    padding: dimensions.UNIT,
  },

  active: {
    borderColor: colors.WHITE,
  },

}

export const IconButtonTV = ({
  children,
  onFocus,
  onBlur,
  buttonProps = {},
  emphasis,
  size,
  ...rest
}) => {
  const [active, setActive] = React.useState(false)

  const handleOnFocus = React.useCallback(() => {
    setActive(true)

    if (onFocus) {
      onFocus()
    }
  }, [])

  const handleOnBlur = React.useCallback(() => {
    setActive(false)

    if (onBlur) {
      onBlur()
    }
  }, [])

  return (
    <BaseIconButton
      buttonProps={{
        ...buttonProps,
        component: TouchableHighlight,
      }}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      emphasis={active ? emphasis : 'low'}
      size={size}
      {...rest}>
      {children}
    </BaseIconButton>
  )
}

IconButtonTV.propTypes = {
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
}

IconButtonTV.defaultProps = {
  variant: 'button',
  color: 'white',
  emphasis: 'high',
  animatable: {},
  animatableStyle: {},
}

export default IconButtonTV
