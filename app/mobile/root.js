import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'
import WatchOnTvManager from 'modules/WatchOnTvManager'
import navigationRef from 'modules/RootNavigation'

import Portal from 'components/Portal'
import ApolloLoader from 'components/ApolloLoader'
import CheckForUpdates from 'components/CheckForUpdates'

import Screens from './screens'
import Disclaimer from './screens/Disclaimer'

export default () => (
  <NavigationContainer ref={navigationRef}>
    <Disclaimer>
      <IpFinder>
        {(host) => (
          <ApolloLoader host={host}>
            <DownloadManager>
              <WatchOnTvManager>

                <Portal.host>
                  <Screens />
                </Portal.host>

                {/*<CheckForUpdates />*/}

              </WatchOnTvManager>
            </DownloadManager>
          </ApolloLoader>
        )}
      </IpFinder>
    </Disclaimer>
  </NavigationContainer>
)
