import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import usePollingForDownload from 'modules/GraphQL/usePollingForDownload'
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
}

export const Download = ({ download, downloadManager, refreshScreen }) => {
  const data = usePollingForDownload(download, downloadManager)
  const { status, progress, speed, timeRemaining, numPeers, quality } = data || download
  const { movie, episode } = download

  const removeDownload = async() => {
    await downloadManager.removeDownload({
      ...download,
      // TODO:: Make a util and get the show title from there so format will be:
      // Show: S01E01. Episode Title
      title: movie?.title ?? `${episode?.show?.title}: S${episode?.season}E${episode?.number}. ${episode?.title}`
    })

    refreshScreen()
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

        <View>
          <Typography variant={'subtitle2'}>
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
  data: PropTypes.object,
}

Download.defaultProps = {
  data: null,
}

export default Download
