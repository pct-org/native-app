import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'
import Image from 'components/Image'
import Container from 'components/Container'

import QualitySelector from 'mobile/components/QualitySelector'

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

  downloadIcon: {
    width: dimensions.UNIT * 8,
    textAlign: 'center',
  },

})

export const Episode = (props) => {
  const [showQualitySelector, toggleSelecting] = useState(false)
  const { title, synopsis, number, hasAired, images, firstAired } = props

  const getAirsDate = () => {
    const airs = new Date()
    airs.setTime(firstAired)

    return `${`0${airs.getDate()}`.slice(-2)}-${`0${(airs.getMonth() + 1)}`.slice(-2)}-${airs.getFullYear()}`
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
                    visible={showQualitySelector}
                    item={props}
                    onRequestClose={() => toggleSelecting(false)}
                  />
                )}

                {!hasAired && (
                  <Typography variant={'caption'}>
                    {getAirsDate()}
                  </Typography>
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

          <Typography
            variant={'captionSmall'}
            emphasis={'low'}>
            {getAirsDate()}
          </Typography>
        </View>

        {hasAired && (
          <QualitySelector
            item={props}
            variant={constants.TYPE_DOWNLOAD}
            style={styles.downloadIcon}
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
}

Episode.defaultProps = {
  synopsis: null,
  hasTorrents: false,
  hasAired: false,

  images: {
    poster: {
      thumb: null,
    },
  },
}

export default Episode
