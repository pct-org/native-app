import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DownloadManager from 'modules/DownloadManager'
import IpFinder from 'modules/IpFinder'
import SideSheetManager from 'modules/SideSheetManager'
import navigationRef from 'modules/RootNavigation'
import WatchOnTvManager from 'modules/WatchOnTvManager'

import ApolloLoader from 'components/ApolloLoader'

import Screens from './screens'

export default () => (
  // <FocusManager>
  <NavigationContainer ref={navigationRef}>
    <IpFinder>
      {(host) => (
        <ApolloLoader host={host}>
          <DownloadManager>
            <WatchOnTvManager isTv>

              <SideSheetManager>
                <Screens />
              </SideSheetManager>

            </WatchOnTvManager>
          </DownloadManager>
        </ApolloLoader>
      )}
    </IpFinder>
  </NavigationContainer>
  // </FocusManager>
)
