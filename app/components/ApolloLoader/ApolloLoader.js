import React from 'react'
import { ApolloProvider } from '@apollo/react-common'

import getClient from 'modules/GraphQL/Apollo'

export default class ApolloLoader extends React.PureComponent {

  state = {
    loading: true,
  }

  client = null

  async componentDidMount() {
    this.client = await getClient()

    this.setState({
      loading: false,
    })
  }

  render() {
    const { children } = this.props
    const { loading } = this.state

    if (loading) {
      return null
    }

    return (
      <ApolloProvider client={this.client}>
        {children}
      </ApolloProvider>
    )
  }

}