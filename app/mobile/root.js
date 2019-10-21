import React from 'react'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'

import ApolloLoader from 'components/ApolloLoader'
import CheckForUpdates from 'components/CheckForUpdates'

import Screens from './screens'

export default () => (
  <IpFinder>
    {host => (
      <ApolloLoader host={host}>
        <CheckForUpdates>
          <DownloadManager>
            {/*<Disclaimer>*/}
            <Screens />
            {/*</Disclaimer>*/}
          </DownloadManager>
        </CheckForUpdates>
      </ApolloLoader>
    )}
  </IpFinder>
)
