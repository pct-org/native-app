import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import Typography from 'components/Typography'

import BaseButton from '../BaseButton'

export const TextButton = ({ children, onPress, upperCase, ...rest }) => (
  <BaseButton onPress={onPress}>

    <Text style={Typography.getTextStyle(rest)}>
      {upperCase ? children.toUpperCase() : children}
    </Text>

  </BaseButton>
)

TextButton.propTypes = {
  onPress : PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}

TextButton.defaultProps = {
  upperCase : true,
  variant   : 'button',
  color     : 'white',
  fontWeight: 'bold',
  emphasis  : 'high',
}

export default TextButton
