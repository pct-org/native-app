import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { material } from 'react-native-typography'

import capitalizeFirstLetter from 'modules/utils/capitalizeFirstLetter'

export const Typography = ({ variant, style, color, children }) => (
  <Text
    style={[material[`${variant}${capitalizeFirstLetter(color)}`], style]}>
    {children}
  </Text>
)

Typography.propTypes = {
  variant : PropTypes.oneOf([
    'display1',
    'headline',
    'title',
    'body1',
    'body2',
    'caption',
    'button',
  ]),
  color   : PropTypes.oneOf(['white', '']),
  style   : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
}

Typography.defaultProps = {
  variant: 'body1',
  color  : 'white',
  style  : null,
}

export default Typography
