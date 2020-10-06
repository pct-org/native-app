import React, { useEffect } from 'react'
import { InteractionManager, RefreshControl, ScrollView } from 'react-native'
import { useLazyQuery } from '@apollo/client'

import colors from 'modules/colors'

import Container from 'components/Container'

import { AboutQuery } from './SettingsQuery'
import About from './About'
import Downloads from './Downloads'
import Subtitles from './Subtitles'

export const styles = {

  root: {
    flex: 1,
  },

}

export const Settings = () => {
  const [executeAboutQuery, { data: aboutData, loading: aboutLoading }] = useLazyQuery(
    AboutQuery,
  )

  useEffect(() => {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeAboutQuery()
    })
  }, [])

  return (
    <Container style={styles.root}>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={aboutLoading && !!aboutData}
            onRefresh={() => {
              executeAboutQuery()
            }}
            colors={[colors.PRIMARY_COLOR_200]}
            progressBackgroundColor={colors.BACKGROUND_TABS}
          />
        }>

        <About data={aboutData} />

        <Subtitles />

        <Downloads />

      </ScrollView>

    </Container>
  )
}

export default Settings
