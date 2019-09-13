import React from 'react'
import PropTypes from 'prop-types'
import { withNavigationFocus } from 'react-navigation'

import { Mode as ModeBase } from './ModeScreen'

export class Mode extends ModeBase {

  componentDidMount() {
    console.log('MODE TV')
  }

  componentWillUnmount() {}

}

export default withNavigationFocus(Mode)
