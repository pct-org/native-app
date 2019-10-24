import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StatusBar, SafeAreaView, RefreshControl } from 'react-native'

import colors from 'modules/colors'
import StatusBarController from 'modules/StatusBarController'

export default class ScrollViewWithStatusBar extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
  }

  static defaultProps = {
    onRefresh: null,
    refreshing: false,
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
    const { children, style, refreshing, onRefresh } = this.props

    return (
      <SafeAreaView
        style={style}
        refreshControl={
          onRefresh
            ? <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
            : null
        }>
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
