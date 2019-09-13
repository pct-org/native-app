import React from 'react'
import ApolloLoader from 'components/ApolloLoader'

import Screens from './screens'

export default () => (
  <ApolloLoader>
    {/*<Disclaimer>*/}
      <Screens />
    {/*</Disclaimer>*/}
  </ApolloLoader>
)
