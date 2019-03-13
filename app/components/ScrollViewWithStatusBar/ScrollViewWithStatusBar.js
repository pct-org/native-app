import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StatusBar, SafeAreaView } from 'react-native'
import { withNavigationFocus } from 'react-navigation'

import StatusBarController from 'modules/StatusBarController'

@withNavigationFocus
export default class ScrollViewWithStatusBar extends React.Component {


  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    statusBarColor: 'default',
  }

  yOffset = 0

  componentWillMount() {
    this.forceUpdateScroll()
  }

  componentWillReceiveProps(nextProps) {
    const { isFocused } = nextProps
    const { isFocused: wasFocused } = this.props

    if (isFocused && !wasFocused) {
      this.forceUpdateScroll()
    }
  }

  forceUpdateScroll = () => this.handleScroll({ nativeEvent: { contentOffset: { y: this.yOffset } } }, true)

  handleScroll = (event, force = false) => {
    const { statusBarColor } = this.state

    const { y } = event.nativeEvent.contentOffset

    this.yOffset = y

    if (y > 10 && y < 400 && (statusBarColor !== 'transparent' || force)) {
      this.handleUpdateBackgroundColor('rgba(0, 0, 0, 0.2)', 'transparent')

    } else if (y > 400 && (statusBarColor !== 'dark' || force)) {
      this.handleUpdateBackgroundColor('rgba(0, 0, 0, 1)', 'dark')

    } else if (y < 10 && (statusBarColor !== 'default' || force)) {
      this.handleUpdateBackgroundColor('rgba(0, 0, 0, 0)', 'default')
    }
  }

  handleUpdateBackgroundColor = (statusBarBackgroundColor, statusBarColor) => {
    StatusBarController.update(statusBarBackgroundColor)

    this.setState({
      statusBarColor,
    })
  }

  render() {
    const { children } = this.props

    return (
      <SafeAreaView>
        <StatusBar
          backgroundColor={'rgba(0, 0, 0, 0)'}
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
