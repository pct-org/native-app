import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager, View } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'

import SettingsQuery from '../SettingsQuery'

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

  scraperContainer: {
    marginTop: 1,
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: dimensions.UNIT,
  },
}

export const ApisStatus = () => {
  const [executeQuery, { data }] = useLazyQuery(
    SettingsQuery,
  )

  useEffect(() => {
    // Execute the query after the component is done navigation
    InteractionManager.runAfterInteractions(() => {
      // Execute the query
      executeQuery()
    })
  }, [])

  return (
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
        style={[styles.container, styles.scraperContainer]}
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
            {i18n.t('Status: {{status}}', { status: data?.scraper?.status  ?? 'unknown' })}
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

    </Container>
  )
}

ApisStatus.propTypes = {}

ApisStatus.defaultProps = {}

export default ApisStatus
