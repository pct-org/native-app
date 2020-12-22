import React from 'react'
import { StyleSheet } from 'react-native'

import dimensions from 'modules/dimensions'
import useCorrect from 'modules/useCorrect'
import Divider from 'components/Divider'

import OptionsItem from '../OptionsItem'

export const styles = StyleSheet.create({

  root: {
    marginVertical: useCorrect(
      dimensions.UNIT * 2,
      null,
      dimensions.UNIT
    )
  }

})

export interface Props {
  label: string
}

export const SettingsHeader: React.FC<Props> = ({ label }) => {
  return (
    <>
      <OptionsItem
        style={styles.root}
        label={label}
      />

      <Divider />
    </>
  )
}

export default SettingsHeader
