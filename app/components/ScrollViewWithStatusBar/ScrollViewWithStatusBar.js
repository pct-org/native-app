import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StatusBar, SafeAreaView } from 'react-native'

import colors from 'modules/colors'
import StatusBarController from 'modules/StatusBarController'

export default class ScrollViewWithStatusBar extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    statusBarColor: 'default',
  }

  yOffset = 0

  componentDidMount() {
    this.forceUpdateScroll()
  }

  forceUpdateScroll = () => this.handleScroll({ nativeEvent: { contentOffset: { y: this.yOffset } } }, true)

  handleScroll = (event, force = false) => {
    const { statusBarColor } = this.state

    const { y } = event.nativeEvent.contentOffset

    this.yOffset = y

    if (y > 10 && y < 400 && (statusBarColor !== 'transparent' || force)) {
      this.handleUpdateBackgroundColor(colors.STATUS_BAR_TRANSPARENT, 'transparent')

    } else if (y < 10 && (statusBarColor !== 'default' || force)) {
      this.handleUpdateBackgroundColor(colors.STATUS_BAR_GONE, 'default')
    }
  }

  handleUpdateBackgroundColor = (statusBarBackgroundColor, statusBarColor) => {
    StatusBarController.update(statusBarBackgroundColor)

    this.setState({
      statusBarColor,
    })
  }

  render() {
    const { children, style } = this.props

    return (
      <SafeAreaView style={style}>

        <StatusBar
          translucent
          animated
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll}>
          {children}
        </ScrollView>

      </SafeAreaView>
    )
  }

}
