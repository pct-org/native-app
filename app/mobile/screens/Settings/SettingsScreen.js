import React, { useEffect } from 'react'
import { StyleSheet, View, InteractionManager, Linking } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import colors from 'modules/colors'

import Container from 'components/Container'

import ApisStatus from './ApisStatus'

const styles = StyleSheet.create({

  root: {
    flex: 1,

  },

})

export const Settings = () => {
  return (
    <Container style={styles.root}>

      <ApisStatus />

    </Container>
  )
}

export default Settings
