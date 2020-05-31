import React from 'react'
import PropTypes from 'prop-types'
import { View, Linking } from 'react-native'
import Updater from 'update-react-native-app'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { navigate } from 'modules/RootNavigation'
import withIpFinder from 'modules/IpFinder/withIpFinder'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'
import TextButton from 'components/TextButton'

export const styles = {

  root: {
    paddingTop: dimensions.STATUSBAR_HEIGHT + dimensions.UNIT * 2,
  },

  title: {
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
    marginBottom: dimensions.UNIT / 2,
  },

  container: {
    paddingTop: dimensions.UNIT / 2,
    paddingBottom: dimensions.UNIT,

    display: 'flex',
    flexDirection: 'row',
  },

  divider: {
    marginTop: 1,
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: dimensions.UNIT,
  },
}

export const About = ({ data, ipFinder }) => (
  <Container style={styles.root}>

    <Typography
      style={styles.title}
      variant={'headline6'}>About</Typography>

    <Container
      style={styles.container}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'filmstrip'} />
      </View>

      <View>
        <Typography variant={'subtitle2'}>GraphQL-API</Typography>
        <Typography variant={'caption'}>
          {i18n.t('Version: {{version}}', { version: data?.status?.version ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Movies: {{movies}}', { movies: data?.status?.totalMovies ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Shows: {{shows}}', { shows: data?.status?.totalShows ?? 'unknown' })}
        </Typography>
      </View>
    </Container>

    <Container
      style={[styles.container, styles.divider]}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'database-import'} />
      </View>

      <View>
        <Typography variant={'subtitle2'}>Scraper</Typography>
        <Typography variant={'caption'}>
          {i18n.t('Version: {{version}}', { version: data?.scraper?.version ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Status: {{status}}', { status: data?.scraper?.status ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Uptime: {{uptime}}', { uptime: data?.scraper?.uptime ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Last updated: {{update}}', { update: data?.scraper?.updated ?? 'unknown' })}
        </Typography>
        <Typography variant={'caption'}>
          {i18n.t('Next update: {{update}}', { update: data?.scraper?.nextUpdate ?? 'unknown' })}
        </Typography>
      </View>
    </Container>

    <Container
      style={[styles.container, styles.divider]}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'popcorn'} />
      </View>

      <View style={styles.textContainer}>
        <Typography variant={'subtitle2'}>App</Typography>
        <Typography variant={'caption'}>
          {i18n.t('Version: {{version}}', { version: Updater?.UpdateRNApp?.versionName ?? 'unknown' })}
        </Typography>
      </View>
    </Container>

    <TextButton onPress={() => navigate('AppChangelog')}>
      Changelog
    </TextButton>

    <TextButton onPress={() => Linking.openURL(`http://${ipFinder.ip}:${ipFinder.SCRAPER_PORT}/files`)}>
      Log files
    </TextButton>

  </Container>
)

About.propTypes = {
  data: PropTypes.object,
}

About.defaultProps = {
  data: null,
}

export default withIpFinder(About)
