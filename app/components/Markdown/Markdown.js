import React from 'react'
import PropTypes from 'prop-types'
import MD from 'react-native-markdown-renderer'

import dimensions from 'modules/dimensions'

import Typography from '../Typography'

export const style = {

  heading1: Typography.getTextStyle({
    variant: 'headline5',
    asObject: true,
  }),

  heading2: Typography.getTextStyle({
    variant: 'headline6',
    asObject: true,
  }),

  heading3: Typography.getTextStyle({
    variant: 'subtitle2',
    asObject: true,
  }),

  text: Typography.getTextStyle({
    variant: 'body2',
    asObject: true,
  }),

  listUnorderedItemIcon: {
    lineHeight: dimensions.UNIT * 4,
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

  listItem: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: dimensions.UNIT * 4,
  },

}

export const Markdown = ({ children }) => (
  <MD style={style}>
    {children}
  </MD>
)

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Markdown
