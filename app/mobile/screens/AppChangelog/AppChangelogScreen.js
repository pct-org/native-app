import React from 'react'
import { ScrollView } from 'react-native'

import dimensions from 'modules/dimensions'

import Container from 'components/Container'
import Markdown from 'components/Markdown'

import changelogMd from '../../../../CHANGELOG.md'

const styles = {

  root: {
    flex: 1,
  },

  container: {
    marginTop: dimensions.STATUSBAR_HEIGHT + dimensions.UNIT,
    marginLeft: dimensions.UNIT * 2,
    marginRight: dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
  },

}

export const AppChangelog = () => (
  <Container style={styles.root}>
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Markdown>
        {`${changelogMd}`}
      </Markdown>
    </ScrollView>
  </Container>
)

export default AppChangelog
