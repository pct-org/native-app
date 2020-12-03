import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useApolloClient } from '@apollo/client'

export const withApollo = (Component) => hoistNonReactStatics(
  React.forwardRef((props, ref) => {
    const client = useApolloClient()

    return (
      <Component
        {...props}
        apollo={client}
        ref={ref} />
    )
  }),
  Component,
)

export default withApollo
