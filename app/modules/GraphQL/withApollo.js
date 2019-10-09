import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { ApolloConsumer } from '@apollo/react-common'

export const withApollo = Component => hoistNonReactStatics(
  React.forwardRef((props, ref) => (
      <ApolloConsumer>
        {client => <Component {...props} apollo={client} ref={ref} />}
      </ApolloConsumer>
    ),
  ),
  Component,
)

export default withApollo
