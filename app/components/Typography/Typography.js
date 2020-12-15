import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import useCorrect from 'modules/useCorrect'
import capitalizeFirstLetter from 'modules/utils/capitalizeFirstLetter'

import stylesMobile from './Typography.styles'
import stylesTV from './Typography.styles.tv'

const styles = useCorrect(stylesMobile, null, stylesTV)

export default class Typography extends Component {

  static propTypes = {
    textProps: PropTypes.object,

    variant: PropTypes.oneOf([
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

    transform: PropTypes.oneOf([
      'default',
      'lowercase',
      'uppercase',
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
    variant: 'body1',
    fontWeight: 'default',
    transform: 'default',
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
    transform = Typography.defaultProps.transform,
    style: styleProp = null,
    asObject = false,
  }) => {
    const styledColor = styles[`color${capitalizeFirstLetter(color)}`]
    const styledFont = fontWeight !== 'default' ? styles[`fontFamily${capitalizeFirstLetter(fontWeight)}`] : null
    const styledEmphasis = styles[`emphasis${capitalizeFirstLetter(emphasis)}`]
    const styledTransform = transform !== 'default' ? styles[`transform${capitalizeFirstLetter(transform)}`] : null

    const textStyles = [
      styledColor,
      styles[variant],
      styledEmphasis,
      styledTransform,
    ]

    if (styledFont) {
      textStyles.push(styledFont)
    }

    if (styleProp) {
      textStyles.push(styleProp)
    }

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

