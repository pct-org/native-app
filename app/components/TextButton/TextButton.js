import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

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
  onLongPress,
  onFocus,
  onBlur,
  component,
  hasTVPreferredFocus,
  nextFocusUp,
  nextFocusDown,
  nextFocusForward,
  nextFocusLeft,
  nextFocusRight,
  nativeID,
  animatable,
  animatableStyle,
  ...rest
}) => (
  <BaseButton
    onPress={onPress}
    onLongPress={onLongPress}
    innerRef={innerRef}
    onFocus={onFocus}
    onBlur={onBlur}
    component={component}
    hasTVPreferredFocus={hasTVPreferredFocus}
    nextFocusUp={nextFocusUp}
    nextFocusDown={nextFocusDown}
    nextFocusForward={nextFocusForward}
    nextFocusLeft={nextFocusLeft}
    nextFocusRight={nextFocusRight}
    rippleBorderless={false}
    nativeID={nativeID}>
    <Animatable.View
      {...animatable}
      style={animatableStyle}>
      <Text style={[
        styles.root,
        Typography.getTextStyle(rest),
      ]}>
        {children}
      </Text>
    </Animatable.View>
  </BaseButton>
)

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
  animatableStyle: {}
}

export default TextButton
