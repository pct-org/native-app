import React from 'react'
import { Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'
import deviceInfo from 'react-native-device-info'

import i18n from 'modules/i18n'

import FullScreenLoading from 'components/FullScreenLoading'
import IpFinderContext from './IpFinderContext'

export default class IpFinder extends React.Component {

  state = {
    host: null,
    loading: true,
    connectedToWifi: false,
    failed: false,
  }

  async componentDidMount() {
    const state = await NetInfo.fetch()

    let newState = {}
    newState.connectedToWifi = state.type === 'wifi' && state.isConnected

    let host = await AsyncStorage.getItem('@ipFinder.host')

    // Check if we have host or that current is still available and if we are connected to wifi
    // other check for host
    if ((!host || !(await this.isHost(host))) && newState.connectedToWifi) {
      host = null

      SplashScreen.hide()

      if (await deviceInfo.isEmulator()) {
        // If we are a emulator then check the host ip
        if (await this.isHost('10.0.2.2:5000')) {
          host = '10.0.2.2:5000'
        }
      }

      // Check if host is still null
      if (!host) {
        const deviceIp = await deviceInfo.getIpAddress()

        host = await this.getHost(deviceIp)
      }
    }

    newState.loading = false
    newState.host = host
    newState.failed = host === null

    this.setState(newState)
  }

  /**
   * Finds the GraphQL api on the local network
   *
   * @param deviceIp
   * @return {Promise<string>}
   */
  getHost = async(deviceIp) => {
    const ipParts = deviceIp.split('.')
    const blacklistIp = ipParts.pop()

    // Get the base ip
    const baseIp = ipParts.join('.')

    let hostIp = null

    await Promise.all(
      Array(255).fill().forEach(async(empty, index) => {
        if (index !== blacklistIp && hostIp === null) {
          if (await this.isHost(`${baseIp}.${index}:5000`)) {
            hostIp = index
          }
        }
      }),
    )

    if (hostIp === null) {
      return null
    }

    const host = `${baseIp}.${hostIp}:5000`

    await AsyncStorage.setItem('@ipFinder.host', host)

    return host
  }

  /**
   * Checks whether an ip is the GraphQL API
   * @param ip
   * @return {Promise<unknown>}
   */
  isHost = async(ip) => new Promise((resolve) => {
    let didTimeOut = false

    const timeout = setTimeout(() => {
      didTimeOut = true
      resolve(false)

    }, 1000)

    fetch(`http://${ip}/status`)
      .then(() => {
        // Clear the timeout as cleanup
        clearTimeout(timeout)

        if (!didTimeOut) {
          resolve(true)
        }

      })
      .catch(() => {
        // Rejection already happened with setTimeout
        if (didTimeOut) {
          return
        }

        // Reject with error
        resolve(false)
      })
  })


  getValue = () => {
    const { host } = this.state

    return {
      host,
    }
  }

  render() {
    const { children } = this.props
    const { loading, failed, host, connectedToWifi } = this.state

    if (loading || failed) {
      return (
        <FullScreenLoading withLoader={!failed}>
          {i18n.t(failed
            ? 'Could not find GraphQL API'
            : 'Searching for GraphQL API',
          )}
        </FullScreenLoading>
      )
    }

    if (!connectedToWifi) {
      return <Text>Connect to your wifi</Text>
    }

    return (
      <IpFinderContext.Provider value={this.getValue()}>
        {children(host)}
      </IpFinderContext.Provider>
    )
  }

}
