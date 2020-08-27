import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'
import FocusManager from './modules/FocusManager'

import ApolloLoader from 'components/ApolloLoader'

import navigationRef from 'modules/RootNavigation'
import Screens from './screens'

export default () => (
  <FocusManager>
    <NavigationContainer ref={navigationRef}>
      <IpFinder>
        {(host) => (
          <ApolloLoader host={host}>
            <DownloadManager>

              <Screens />

            </DownloadManager>
          </ApolloLoader>
        )}
      </IpFinder>
    </NavigationContainer>
  </FocusManager>
)
