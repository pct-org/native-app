import React from 'react'
import { View } from 'react-native'

import { useDownloadManager } from 'modules/DownloadManager'
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

export const Downloads = () => {
  const downloadManager = useDownloadManager()

  const downloads = downloadManager.getActiveDownloads()

  return (
    <Container style={styles.root}>

      <Typography
        style={styles.title}
        variant={'headline6'}>
        {i18n.t('Active Downloads')}
      </Typography>

      {downloads.length === 0 && (
        <Container
          style={[styles.container, styles.noDownloads]}
          elevation={2}>

          <View>
            <Typography variant={'subtitle2'}>
              {i18n.t('No active downloads')}
            </Typography>
          </View>
        </Container>
      )}

      {downloads?.map((download) => (
        <Download
          key={download._id}
          download={download}
        />
      ))}

    </Container>
  )
}

export default Downloads
