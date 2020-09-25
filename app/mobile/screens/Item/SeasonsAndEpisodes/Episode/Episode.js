import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import colors from 'modules/colors'
import i18n from 'modules/i18n'
import usePollingForDownload from 'modules/hooks/usePollingForDownload'
import addZeros from 'modules/utils/addZeros'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'
import Image from 'components/Image'
import Container from 'components/Container'

import QualitySelector from 'mobile/components/QualitySelector'
import ItemOptions from 'mobile/components/ItemOptions'

export const styles = StyleSheet.create({

  container: {
    display: 'flex',
    marginTop: dimensions.UNIT,
  },

  posterContainer: {
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
    margin: dimensions.UNIT,
  },

  posterWithTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  playIconContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    width: dimensions.SCREEN_WIDTH
           - dimensions.EPISODE_CARD_WIDTH
           - (dimensions.UNIT * 12),
  },

  summary: {
    margin: dimensions.UNIT,
    marginTop: 0,
  },

  image: {
    width: dimensions.EPISODE_CARD_WIDTH,
    height: dimensions.EPISODE_CARD_HEIGHT,
  },

  optionsIcon: {
    width: dimensions.UNIT * 8,
    textAlign: 'center',
  },

  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.PRIMARY_COLOR_200,
    width: 0,
    height: 2,
  },
})

export const Episode = (props) => {
  const [showQualitySelector, toggleSelecting] = useState(false)
  const [download] = usePollingForDownload(props)
  const { title, synopsis, number, hasAired, images, firstAired, watched } = props

  const getAirsDate = () => {
    const airs = new Date()
    airs.setTime(firstAired)

    return addZeros.date(airs)
  }

  return (
    <View style={styles.container}>

      <View style={styles.posterWithTitle}>
        <Container
          elevation={1}
          style={styles.posterContainer}>
          <BaseButton onPress={() => toggleSelecting(true)}>
            <View>
              <Image
                style={styles.image}
                images={images} />

              <View style={styles.playIconContainer}>
                <Overlay />

                {hasAired && (
                  <QualitySelector
                    item={props}
                    style={styles.optionsIcon}
                    visible={showQualitySelector}
                    onClose={() => toggleSelecting(false)}
                  />
                )}

                {!hasAired && (
                  <Typography variant={'caption'}>
                    {getAirsDate()}
                  </Typography>
                )}

                {watched?.progress > 0 && (
                  <View style={{
                    ...styles.progress,
                    width: `${watched.progress || 0}%`,
                  }} />
                )}
              </View>
            </View>
          </BaseButton>
        </Container>

        <View style={styles.titleContainer}>
          <Typography
            variant={'overline'}
            textProps={{
              width: '100%',
              numberOfLines: 2,
              ellipsizeMode: 'tail',
            }}>
            {`${number}. ${title}`}
          </Typography>

          {download && (
            <Typography
              variant={'captionSmall'}
              color={'primary'}
              emphasis={'high'}>
              {download.status === constants.STATUS_QUEUED && (
                i18n.t('Download in queue')
              )}

              {download.status === constants.STATUS_CONNECTING && (
                i18n.t('Download connecting')
              )}

              {download.status === constants.STATUS_DOWNLOADING && (
                i18n.t('Downloading {{quality}}, {{progress}}%', {
                  quality: download.quality,
                  progress: download.progress,
                })
              )}

              {download.status === constants.STATUS_COMPLETE && (
                i18n.t('Downloaded in {{quality}}', { quality: download.quality })
              )}
            </Typography>
          )}

          <Typography
            variant={'captionSmall'}
            emphasis={'low'}>
            {getAirsDate()}
          </Typography>
        </View>

        {hasAired && (
          <ItemOptions
            item={props}
            style={styles.optionsIcon}
          />
        )}
      </View>

      <Typography
        style={styles.summary}
        variant={'caption'}>
        {synopsis}
      </Typography>

    </View>
  )
}

Episode.propTypes = {
  title: PropTypes.string,
  images: PropTypes.object,
  number: PropTypes.number,
  synopsis: PropTypes.string,
  hasAired: PropTypes.bool,
  firstAired: PropTypes.number,
  watched: PropTypes.object,
  download: PropTypes.object,
}

Episode.defaultProps = {
  title: null,
  number: null,
  firstAired: null,
  watched: null,
  download: null,
  synopsis: null,
  hasAired: false,
  images: {
    poster: {
      thumb: null,
    },
  },
}

export default Episode
