import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import usePollingForDownload from 'modules/hooks/usePollingForDownload'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import BaseButton from 'components/BaseButton'
import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'

export const styles = {

  root: {
    paddingTop: dimensions.UNIT / 2,
    paddingBottom: dimensions.UNIT,

    display: 'flex',
    flexDirection: 'row',
  },

  divider: {
    marginBottom: 1,
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: dimensions.UNIT,
  },

  infoContainer: {
    flex: 1,
    marginRight: dimensions.UNIT,
  },

}

export const Download = ({ download }) => {
  const [data, downloadManager] = usePollingForDownload(download)
  const { status, progress, speed, timeRemaining, numPeers, quality } = data || download
  const { movie, episode } = download

  const removeDownload = async() => {
    await downloadManager.removeDownload(download)

    // TODO:: Show snackbar
  }

  return (
    <BaseButton
      onPress={() => downloadManager.onPress(download)}
      onLongPress={removeDownload}
      rippleBorderless={false}>
      <Container
        style={[styles.root, styles.divider]}
        elevation={2}>

        <View style={styles.iconContainer}>
          <Icon name={'movie'} />
        </View>

        <View style={styles.infoContainer}>
          <Typography
            textProps={{
              numberOfLines: 1,
              ellipsizeMode: 'tail',
            }}
            variant={'subtitle2'}>
            {movie?.title ?? `${episode?.show?.title}: S${episode?.season}E${episode?.number}. ${episode?.title}`}
          </Typography>

          <Typography variant={'caption'}>
            {quality} - {status}
          </Typography>

          {status === constants.STATUS_DOWNLOADING && (
            <React.Fragment>
              <Typography variant={'caption'}>
                {`${progress}% / ${speed}`}
              </Typography>

              <Typography variant={'caption'}>
                {timeRemaining}
              </Typography>

              <Typography variant={'caption'}>
                {`${numPeers} peer${numPeers > 1 ? 's' : ''}`}
              </Typography>
            </React.Fragment>
          )}

        </View>
      </Container>
    </BaseButton>
  )
}

Download.propTypes = {
  download: PropTypes.object,
}

Download.defaultProps = {
  download: null,
}

export default Download
