import BaseButton from 'components/BaseButton'
import React from 'react'
import PropTypes from 'prop-types'
import { View, Linking } from 'react-native'
import Updater from 'update-react-native-app'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import i18n from 'modules/i18n'
import { navigate } from 'modules/RootNavigation'
import withIpFinder from 'modules/IpFinder/withIpFinder'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'
import TextButton from 'components/TextButton'

const DISK_BAR_HEIGHT = 8

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

  diskContainer: {
    width: dimensions.SCREEN_WIDTH - dimensions.UNIT * 3 - dimensions.ICON_SIZE_DEFAULT,
  },

  diskBar: {
    width: '100%',
    flexDirection: 'row',
    marginTop: dimensions.UNIT,
  },

  diskStats: {
    flexDirection: 'row',
    marginTop: dimensions.UNIT,
  },

  diskStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
}

export const About = ({ data, ipFinder }) => (
  <Container style={styles.root}>

    <Typography
      style={styles.title}
      variant={'headline6'}>
      {i18n.t('About')}
    </Typography>

    <Container
      style={styles.container}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'filmstrip'} />
      </View>

      <View>
        <Typography variant={'subtitle2'}>API</Typography>
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

    <BaseButton
      onPress={() => navigate('AppChangelog')}
    >
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
    </BaseButton>

    <Container
      style={[styles.container, styles.divider]}
      elevation={2}>

      <View style={styles.iconContainer}>
        <Icon name={'cloud-download'} />
      </View>

      <View style={styles.diskContainer}>
        <Typography variant={'subtitle2'}>Downloads</Typography>

        <View style={styles.diskBar}>
          <View style={{
            width: `${data?.status?.disk?.sizePercentage ?? 100}%`,
            height: DISK_BAR_HEIGHT,
            backgroundColor: colors.ON_SURFACE_MEDIUM,
          }} />

          <View style={{
            width: `${data?.status?.disk?.usedPercentage ?? 0}%`,
            height: DISK_BAR_HEIGHT,
            backgroundColor: colors.PRIMARY_COLOR_200,
          }} />

          <View style={{
            width: `${data?.status?.disk?.freePercentage ?? 0}%`,
            height: DISK_BAR_HEIGHT,
            backgroundColor: colors.WHITE,
          }} />
        </View>

        <View style={styles.diskStats}>
          <View style={styles.diskStat}>
            <View style={{
              width: (DISK_BAR_HEIGHT),
              height: DISK_BAR_HEIGHT,
              backgroundColor: colors.ON_SURFACE_MEDIUM,
              borderRadius: 10,
              marginRight: dimensions.UNIT / 2,
            }} />
            <Typography variant={'caption'}>
              Size: {data?.status?.disk?.size ?? 0}
            </Typography>
          </View>

          <View style={styles.diskStat}>
            <View style={{
              width: (DISK_BAR_HEIGHT),
              height: DISK_BAR_HEIGHT,
              backgroundColor: colors.PRIMARY_COLOR_200,
              borderRadius: 10,
              marginRight: dimensions.UNIT / 2,
            }} />
            <Typography variant={'caption'}>
              Used: {data?.status?.disk?.used ?? 0}
            </Typography>
          </View>

          <View style={styles.diskStat}>
            <View style={{
              width: (DISK_BAR_HEIGHT),
              height: DISK_BAR_HEIGHT,
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              marginRight: dimensions.UNIT / 2,
            }} />
            <Typography variant={'caption'}>
              Free: {data?.status?.disk?.free ?? 0}
            </Typography>
          </View>
        </View>
      </View>

    </Container>

  </Container>
)

About.propTypes = {
  data: PropTypes.object,
}

About.defaultProps = {
  data: null,
}

export default withIpFinder(About)
