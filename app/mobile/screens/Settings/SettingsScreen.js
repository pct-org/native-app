import React, { useEffect } from 'react'
import { InteractionManager, RefreshControl, ScrollView } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import colors from 'modules/colors'

import Container from 'components/Container'

import { AboutQuery, ActiveDownloads } from './SettingsQuery'
import About from './About'
import Downloads from './Downloads'

export const styles = {

  root: {
    flex: 1,

  },

}

export const Settings = () => {
  const [executeAboutQuery, { data: aboutData, loading: aboutLoading }] = useLazyQuery(
    AboutQuery,
  )

  const [executeActiveDownloadsQuery, { data: downloadsData, loading: downloadsLoading }] = useLazyQuery(
    ActiveDownloads,
  )

  useEffect(() => {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeAboutQuery()
      executeActiveDownloadsQuery()
    })
  }, [])

  return (
    <Container style={styles.root}>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={(downloadsLoading || aboutLoading) && !!aboutData}
            onRefresh={() => {
              executeAboutQuery()
              executeActiveDownloadsQuery()
            }}
            colors={[colors.PRIMARY_COLOR_200]}
            progressBackgroundColor={colors.BACKGROUND_TABS}
          />
        }>

        <About
          data={aboutData}
        />

        <Downloads
          data={downloadsData}
          executeQuery={executeActiveDownloadsQuery}
        />

      </ScrollView>

    </Container>
  )
}

export default Settings
