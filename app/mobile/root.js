import React from 'react'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'

import ApolloLoader from 'components/ApolloLoader'

import Screens from './screens'

export default () => (
  <IpFinder>
    {host => (
      <ApolloLoader host={host}>
        <DownloadManager>
          {/*<Disclaimer>*/}
          <Screens />
          {/*</Disclaimer>*/}
        </DownloadManager>
      </ApolloLoader>
    )}
  </IpFinder>
)
