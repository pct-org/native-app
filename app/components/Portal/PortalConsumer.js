import React from 'react'

export default class PortalConsumer extends React.Component {

  key

  async componentDidMount() {
    // Delay updating to prevent React from going to infinite loop
    await Promise.resolve()

    this.key = this.props.manager.mount(this.props.children)
  }

  componentDidUpdate() {
    this.props.manager.update(this.key, this.props.children)
  }

  componentWillUnmount() {
    this.props.manager.unmount(this.key)
  }

  render() {
    return null
  }
}
