import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import BaseButton from '../BaseButton'

export const IconButton = ({ onPress, ...rest }) => (
  <BaseButton onPress={onPress}>
    <Icon
      {...rest}
    />
  </BaseButton>
)

IconButton.propTypes = {
  onPress: PropTypes.func,
}

IconButton.defaultProps = {
  onPress: null,
}

export default IconButton
