import React from 'react'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'

import ApolloLoader from 'components/ApolloLoader'
import CheckForUpdates from 'components/CheckForUpdates'

import Screens from './screens'
import Disclaimer from './screens/Disclaimer'

export default () => (
  <Disclaimer>
    <IpFinder>
      {host => (
        <ApolloLoader host={host}>
          <DownloadManager>
            <Screens />

            <CheckForUpdates />

          </DownloadManager>
        </ApolloLoader>
      )}
    </IpFinder>
  </Disclaimer>
)
