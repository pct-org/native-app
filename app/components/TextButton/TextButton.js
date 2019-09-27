import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'

import BaseButton from '../BaseButton'

export const styles = {

  root: {
    minWidth: dimensions.QUALITY_WIDTH,
    paddingTop: dimensions.UNIT,
    paddingBottom: dimensions.UNIT,
    textAlign: 'center',
  },

}
export const TextButton = ({
  children,
  innerRef,
  onPress,
  onFocus,
  onBlur,
  upperCase,
  component,
  ...rest
}) => (
  <BaseButton
    onPress={onPress}
    innerRef={innerRef}
    onFocus={onFocus}
    onBlur={onBlur}
    component={component}>
    <Text style={[
      styles.root,
      Typography.getTextStyle(rest)
    ]}>
      {children}
    </Text>

  </BaseButton>
)

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}

TextButton.defaultProps = {
  upperCase: true,
  variant: 'button',
  color: 'white',
  emphasis: 'high',
}

export default TextButton
