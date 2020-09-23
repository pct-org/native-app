import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import withDownloadManager from 'modules/DownloadManager/withDownloadManager'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Container from 'components/Container'
import Typography from 'components/Typography'

import Download from './Download'

export const styles = {

  root: {
    paddingTop: dimensions.UNIT * 2,
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

  noDownloads: {
    padding: dimensions.UNIT,
  },

}

export const Downloads = ({ executeQuery, data, downloadManager, loading }) => (
  <Container style={styles.root}>

    <Typography
      style={styles.title}
      variant={'headline6'}>
      {i18n.t('Active Downloads')}
    </Typography>

    {(!data?.activeDownloads || data?.activeDownloads?.length === 0) && (
      <Container
        style={[styles.container, styles.noDownloads]}
        elevation={2}>

        <View>
          {loading && (
            <Typography variant={'subtitle2'}>
              {i18n.t('Loading')}
            </Typography>
          )}

          {!loading && (
            <Typography variant={'subtitle2'}>
              {i18n.t('No active downloads')}
            </Typography>
          )}
        </View>
      </Container>
    )}

    {data?.activeDownloads?.map((download) => (
      <Download
        key={download._id}
        download={download}
        downloadManager={downloadManager}
        refreshScreen={executeQuery}
      />
    ))}

  </Container>
)

Downloads.propTypes = {
  executeQuery: PropTypes.func.isRequired,
  data: PropTypes.object,
}

Downloads.defaultProps = {
  data: null,
}

export default withDownloadManager(Downloads)
