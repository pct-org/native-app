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
      'headline1',
      'headline2',
      'headline3',
      'headline4',
      'headline5',
      'headline6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'captionSmall',
      'overline',
    ]),

    color: PropTypes.oneOf([
      'white',
      'black',
      'primary',
      'primaryDark',
    ]),

    emphasis: PropTypes.oneOf([
      'high',
      'medium',
      'low',
    ]),

    fontWeight: PropTypes.oneOf([
      'default',
      'regular',
      'medium',
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
    emphasis: 'high',
    color: 'white',
    variant: 'default',
    fontWeight: 'default',
    textProps: {},
    component: null,
    children: null,
    style: null,
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
    const styledFont = fontWeight !== 'default' ? styles[`fontFamily${capitalizeFirstLetter(fontWeight)}`] : null
    const styledEmphasis = styles[`emphasis${capitalizeFirstLetter(emphasis)}`]

    const textStyles = [
      styledColor,
      styles[variant],
      styledFont,
      styleProp,
      color !== 'primary' || emphasis !== 'high' ? styledEmphasis : {},
    ]

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

