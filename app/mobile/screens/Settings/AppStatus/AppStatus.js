import React from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { navigate } from 'modules/RootNavigation'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'
import TextButton from 'components/TextButton'

import packageJson from '../../../../../package.json'

export const styles = {

  root: {
    paddingTop: dimensions.UNIT,
  },

  title: {
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
    marginBottom: dimensions.UNIT / 2,
  },

  container: {
    paddingTop: dimensions.UNIT / 2,
    paddingBottom: dimensions.UNIT / 2,

    display: 'flex',
    flexDirection: 'row',
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: dimensions.UNIT,
  },

  textContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}

export const AppStatus = () => (
  <Container style={styles.root}>

    <Typography
      style={styles.title}
      variant={'headline6'}>
      App
    </Typography>

    <Container
      style={styles.container}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'popcorn'} />
      </View>

      <View style={styles.textContainer}>
        <Typography variant={'caption'}>
          {i18n.t('Version: {{version}}', { version: packageJson?.version ?? 'unknown' })}
        </Typography>
      </View>
    </Container>

    <TextButton onPress={() => navigate('AppChangelog')}>
      Changelog
    </TextButton>

  </Container>
)

AppStatus.propTypes = {}

AppStatus.defaultProps = {}

export default AppStatus
