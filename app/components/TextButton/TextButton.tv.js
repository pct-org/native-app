import dimensions from 'modules/dimensions'
import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'

import colors from 'modules/colors'

import BaseTextButton from './TextButton'

export const styles = {

  root: {
    borderWidth: 1,
    borderColor: colors.TRANSPARENT,

    padding: dimensions.UNIT
  },

  active: {
    borderColor: colors.WHITE,
  },

}

export const TextButton = ({
  children,
  onFocus,
  onBlur,
  style = {},
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
    <BaseTextButton
      component={TouchableHighlight}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      style={{
        ...style,
        ...styles.root,
        ...(active ? styles.active : {}),
      }}
      {...rest}>
      {children}
    </BaseTextButton>
  )
}

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
}

TextButton.defaultProps = {
  variant: 'button',
  color: 'white',
  emphasis: 'high',
  animatable: {},
  animatableStyle: {},
}

export default TextButton
