import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import capitalizeFirstLetter from 'modules/utils/capitalizeFirstLetter'

import styles from './Typography.styles'

export default class Typography extends Component {

  static propTypes = {
    textProps: PropTypes.object,

    variant: PropTypes.oneOf([
      'default',
      'display1',
      'display2',
      'display3',
      'display4',
      'display5',
      'display6',
      'headline',
      'title',
      'subheading',
      'body2',
      'body1',
      'caption',
      'button',
    ]),

    color: PropTypes.oneOf([
      'white',
      'black',
    ]),

    emphasis: PropTypes.oneOf([
      'high',
      'medium',
    ]),

    fontWeight: PropTypes.oneOf([
      'thin',
      'extraLight',
      'light',
      'regular',
      'medium',
      'bold',
      'black',
    ]),

    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),

    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(Component),
    ]),

    style: PropTypes.object,
  }

  static defaultProps = {
    emphasis  : 'high',
    color     : 'white',
    variant   : 'default',
    fontWeight: 'regular',
    textProps : {},
    component : null,
    children  : null,
    style     : null,
  }

  static getTextStyle = ({
    variant = Typography.defaultProps.variant,
    fontWeight = Typography.defaultProps.fontWeight,
    color = Typography.defaultProps.color,
    emphasis = Typography.defaultProps.emphasis,
    style: styleProp = {},
    asObject = false,
  }) => {
    const styledColor = styles[`color${capitalizeFirstLetter(color)}`]
    const styledFont = styles[`fontFamily${capitalizeFirstLetter(fontWeight)}`]
    const styledEmphasis = styles[`emphasis${capitalizeFirstLetter(emphasis)}`]

    const textStyles = [styledColor, styles[variant], styledFont, styleProp, styledEmphasis]

    if (asObject) {
      let objectStyle = {}

      textStyles.forEach(style => objectStyle = {
        ...objectStyle,
        ...style,
      })

      return objectStyle
    }

    return textStyles
  }

  render() {
    const { children, component, textProps } = this.props

    const StyledComponent = component || Text

    return (
      <StyledComponent
        style={Typography.getTextStyle(this.props)}
        {...textProps}>
        {children}
      </StyledComponent>
    )
  }
}

