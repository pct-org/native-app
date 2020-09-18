import React from 'react'
import { View, StyleSheet } from 'react-native'

import PortalManager from './PortalManager'

export const PortalContext = React.createContext(null)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class PortalHost extends React.Component {

  static displayName = 'Portal.Host'

  nextKey = 0
  queue = []
  manager

  componentDidMount() {
    const manager = this.manager
    const queue = this.queue

    while (queue.length && manager) {
      const action = queue.pop()
      if (action) {
        // eslint-disable-next-line default-case
        switch (action.type) {
          case 'mount':
            manager.mount(action.key, action.children)
            break
          case 'update':
            manager.update(action.key, action.children)
            break
          case 'unmount':
            manager.unmount(action.key)
            break
        }
      }
    }
  }

  setManager = (manager) => {
    this.manager = manager
  }

  mount = (children) => {
    const key = this.nextKey++

    if (this.manager) {
      this.manager.mount(key, children)
    } else {
      this.queue.push({ type: 'mount', key, children })
    }

    return key
  }

  update = (key, children) => {
    if (this.manager) {
      this.manager.update(key, children)
    } else {
      const op = { type: 'mount', key, children }
      const index = this.queue.findIndex(
        (o) => o.type === 'mount' || (o.type === 'update' && o.key === key),
      )

      if (index > -1) {
        this.queue[index] = op

      } else {
        this.queue.push(op)
      }
    }
  }

  unmount = (key) => {
    if (this.manager) {
      this.manager.unmount(key)
    } else {
      this.queue.push({ type: 'unmount', key })
    }
  }

  render() {
    const { children } = this.props

    return (
      <PortalContext.Provider
        value={{
          mount: this.mount,
          update: this.update,
          unmount: this.unmount,
        }}>
        {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
        <View
          style={styles.container}
          collapsable={false}
          pointerEvents="box-none">
          {children}
        </View>

        <PortalManager ref={this.setManager} />

      </PortalContext.Provider>
    )
  }
}
