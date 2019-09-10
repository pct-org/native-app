import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'


export default class TvHeader extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <View style={{
        height: 125,
        backgroundColor: 'pink',
        zIndex: 1000
      }}>

      </View>
    )
  }

}
