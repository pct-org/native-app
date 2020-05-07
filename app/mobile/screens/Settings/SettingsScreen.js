import React from 'react'

import Container from 'components/Container'

import ApisStatus from './ApisStatus'
import AppStatus from './AppStatus'

export const styles = {

  root: {
    flex: 1,

  },

}

export const Settings = () => (
  <Container style={styles.root}>

    <ApisStatus />

    <AppStatus />

  </Container>
)

export default Settings
