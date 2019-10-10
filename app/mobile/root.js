import React from 'react'

import DownloadManager from 'modules/DownloadManager'

import ApolloLoader from 'components/ApolloLoader'

import Screens from './screens'

export default () => (
  <ApolloLoader>
    <DownloadManager>
      {/*<Disclaimer>*/}
      <Screens />
      {/*</Disclaimer>*/}
    </DownloadManager>
  </ApolloLoader>
)
