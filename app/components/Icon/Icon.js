import React from 'react'
import PropTypes from 'prop-types'
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

export const styles = {

  '01DP': {
    shadowOpacity: 1,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
  },

}

export const Icon = ({ style, color: colorProp, emphasis: emphasisProp, ...rest }) => {
  let emphasis = ''
  const upperColor = colorProp.toUpperCase()

  if (emphasisProp !== 'high') {
    emphasis = emphasisProp === 'medium'
      ? 80
      : 38
  }

  const color = `${colors.ICON[upperColor]}${emphasis}`

  return (
    <RNIcon
      style={[
        style,
        upperColor.includes('DP')
          ? styles[upperColor]
          : {},
      ]}
      color={color}
      {...rest}>
    </RNIcon>
  )
}

Icon.propTypes = {

  name: PropTypes.string.isRequired,

  color: PropTypes.oneOf([
    'white',
    'black',
    'primary',

    '01dp',
    'surface_medium',
  ]),

  emphasis: PropTypes.oneOf([
    'high',
    'medium',
    'low',
  ]),

  style: PropTypes.object,

  size: PropTypes.number,
}

Icon.defaultProps = {
  emphasis: 'high',
  color: 'white',
  size: dimensions.ICON_SIZE_DEFAULT
}


export default Icon
