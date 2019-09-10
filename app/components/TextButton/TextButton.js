import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import Typography from 'components/Typography'

import BaseButton from '../BaseButton'

export const TextButton = ({
  children,
  innerRef,
  onPress,
  onFocus,
  onBlur,
  upperCase,
  component,
  nextFocusUp,
  nextFocusDown,
  nextFocusForward,
  nextFocusLeft,
  nextFocusRight,
  nativeID,
  ...rest
}) => (
  <BaseButton
    onPress={onPress}
    innerRef={innerRef}
    onFocus={onFocus}
    onBlur={onBlur}
    component={component}
    nextFocusUp={nextFocusUp}
    nextFocusDown={nextFocusDown}
    nextFocusForward={nextFocusForward}
    nextFocusLeft={nextFocusLeft}
    nextFocusRight={nextFocusRight}
    nativeID={nativeID}>

    <Text style={Typography.getTextStyle(rest)}>
      {upperCase ? children.toUpperCase() : children}
    </Text>

  </BaseButton>
)

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,

  nextFocusUp: PropTypes.bool,
  nextFocusDown: PropTypes.bool,
  nextFocusForward: PropTypes.bool,
  nextFocusLeft: PropTypes.bool,
  nextFocusRight: PropTypes.bool,
}

TextButton.defaultProps = {
  upperCase: true,
  variant: 'button',
  color: 'white',
  fontWeight: 'bold',
  emphasis: 'high',

  nextFocusUp: null,
  nextFocusDown: null,
  nextFocusForward: null,
  nextFocusLeft: null,
  nextFocusRight: null,
}

export default TextButton
