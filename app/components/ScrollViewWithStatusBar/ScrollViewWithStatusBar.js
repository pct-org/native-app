import React from 'react'
import { ScrollView, StatusBar, SafeAreaView } from 'react-native'

export default class ScrollViewWithStatusBar extends React.Component {

  state = {
    statusBarBackgroundColor: 'rgba(0, 0, 0, 0)',
    statusBarColor          : 'default',
  }

  static propTypes = {}

  static defaultProps = {}

  handleScroll = (event) => {
    const { statusBarColor } = this.state

    const { y } = event.nativeEvent.contentOffset

    if (y > 10 && y < 400 && statusBarColor !== 'transparent') {
      this.setState({
        statusBarBackgroundColor: 'rgba(0, 0, 0, 0.20)',
        statusBarColor          : 'transparent',
      })

    } else if (y > 400 && statusBarColor !== 'dark') {
      this.setState({
        statusBarBackgroundColor: 'rgba(0, 0, 0, 1)',
        statusBarColor          : 'dark',
      })

    } else if (y < 10 && statusBarColor !== 'default') {
      this.setState({
        statusBarBackgroundColor: 'rgba(0, 0, 0, 0)',
        statusBarColor          : 'default',
      })
    }
  }

  render() {
    const { children } = this.props
    const { statusBarBackgroundColor } = this.state

    return (
      <SafeAreaView>
        <StatusBar
          backgroundColor={statusBarBackgroundColor}
          translucent
          animated
        />

        <ScrollView onScroll={this.handleScroll}>
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }

}
