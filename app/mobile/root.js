import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'
import WatchOnTvManager from 'modules/WatchOnTvManager'
import navigationRef from 'modules/RootNavigation'
import BottomSheetManager from 'modules/BottomSheetManager'

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

                <BottomSheetManager>

                  <Portal.host>
                    <Screens />
                  </Portal.host>

                </BottomSheetManager>

                {/*<CheckForUpdates />*/}

              </WatchOnTvManager>
            </DownloadManager>
          </ApolloLoader>
        )}
      </IpFinder>
    </Disclaimer>
  </NavigationContainer>
)
