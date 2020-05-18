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

  static GRAPH_PORT = 5000
  static SCRAPER_PORT = 5001

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

    let ip = await AsyncStorage.getItem('@ipFinder.ip')
    let host = await AsyncStorage.getItem('@ipFinder.host')

    // Check if we have host or that current is still available and if we are connected to wifi
    // other check for host
    if ((!host || !(await this.isHost(host))) && newState.connectedToWifi) {
      host = null

      SplashScreen.hide()

      if (await deviceInfo.isEmulator()) {
        // If we are a emulator then check the host ip
        if (await this.isHost(`10.0.2.2:${IpFinder.GRAPH_PORT}`)) {
          ip = '10.0.2.2'
          host = `${ip}:${IpFinder.GRAPH_PORT}`
        }
      }

      // Check if host is still null
      if (!host) {
        const deviceIp = await deviceInfo.getIpAddress()

        ip = await this.getIP(deviceIp)
        host = `${ip}:${IpFinder.GRAPH_PORT}`
      }
    }

    newState.loading = false
    newState.host = host
    newState.ip = ip
    newState.failed = ip === null

    if (ip !== null) {
      await AsyncStorage.setItem('@ipFinder.ip', ip)
      await AsyncStorage.setItem('@ipFinder.host', host)
    }

    if (newState.failed) {
      SplashScreen.hide()
    }

    this.setState(newState)
  }

  /**
   * Finds the GraphQL api on the local network
   *
   * @param deviceIp
   * @return {Promise<string>}
   */
  getIP = async(deviceIp) => {
    const ipParts = deviceIp.split('.')
    const blacklistIp = ipParts.pop()

    // Get the base ip
    const baseIp = ipParts.join('.')

    let hostIp = null

    await Promise.all(
      Array(255).fill().map(async(empty, index) => {
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

    return `${baseIp}.${hostIp}`
  }

  /**
   * Checks whether an ip is the GraphQL API
   *
   * @param ip
   * @return {Promise<>}
   */
  isHost = async(ip) => new Promise((resolve) => {
    fetch(`http://${ip}/status`)
      .then(() => {
        resolve(true)

      })
      .catch(() => {
        resolve(false)
      })
  })

  render() {
    const { children } = this.props
    const { loading, failed, host, ip, connectedToWifi } = this.state

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
      <IpFinderContext.Provider value={{
        host,
        ip,

        GRAPH_PORT: IpFinder.GRAPH_PORT,
        SCRAPER_PORT: IpFinder.SCRAPER_PORT
      }}>
        {children(host)}
      </IpFinderContext.Provider>
    )
  }

}
