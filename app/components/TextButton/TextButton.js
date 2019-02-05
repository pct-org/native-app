import Typography from 'components/Typography'
import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import BaseButton from '../BaseButton'

export const TextButton = ({ children, onPress, ...rest }) => (
  <BaseButton onPress={onPress}>

    <Text style={Typography.getTextStyle(rest)}>
      {children.toUpperCase()}
    </Text>

  </BaseButton>
)

TextButton.propTypes = {
  onPress : PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}

TextButton.defaultProps = {
  variant   : 'button',
  color     : 'white',
  fontWeight: 'bold',
}

export default TextButton
