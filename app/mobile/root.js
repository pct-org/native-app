import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'

import ApolloLoader from 'components/ApolloLoader'
import CheckForUpdates from 'components/CheckForUpdates'

import navigationRef  from 'modules/RootNavigation'
import Screens from './screens'
import Disclaimer from './screens/Disclaimer'

export default () => (
  <NavigationContainer ref={navigationRef}>
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
  </NavigationContainer>
)
