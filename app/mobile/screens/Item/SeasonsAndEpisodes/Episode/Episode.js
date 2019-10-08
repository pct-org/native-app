import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'
import Image from 'components/Image'
import Container from 'components/Container'
import IconButton from 'components/IconButton'

import QualitySelector from 'mobile/components/QualitySelector'
import EpisodeStatus from './EpisodeStatus'

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
           - dimensions.UNIT * 3
           - 45,
  },

  summary: {
    margin: dimensions.UNIT,
    marginTop: 0,
  },

  image: {
    width: dimensions.EPISODE_CARD_WIDTH,
    height: dimensions.EPISODE_CARD_HEIGHT,
  },

})


// TODO:: Refactor to dump component with useState
@withNavigation
export default class Episode extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    images: PropTypes.object,
    number: PropTypes.number,
    synopsis: PropTypes.string,
    hasAired: PropTypes.bool,
  }

  static defaultProps = {
    synopsis: null,
    hasTorrents: false,
    hasAired: false,

    images: {
      poster: {
        thumb: null,
      },
    },
  }

  playSelectorRef

  getAirsDate = () => {
    const { firstAired } = this.props

    const airs = new Date()
    airs.setTime(firstAired)

    return `${`0${airs.getDate()}`.slice(-2)}-${`0${(airs.getMonth() + 1)}`.slice(-2)}-${airs.getFullYear()}`
  }

  render() {
    const { title, synopsis, number, hasAired, images, navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={styles.posterWithTitle}>
          <Container
            elevation={1}
            style={styles.posterContainer}>
            <BaseButton onPress={() => this.playSelectorRef.handleOnIconPress()}>
              <View>
                <Image
                  style={styles.image}
                  images={images} />

                <View style={styles.playIconContainer}>
                  <Overlay />

                  {hasAired && (
                    <QualitySelector
                      ref={ref => this.playSelectorRef = ref}
                      item={this.props}
                      navigation={navigation}
                    />
                  )}

                  {!hasAired && (
                    <Typography variant={'caption'}>
                      {this.getAirsDate()}
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
              {this.getAirsDate()}
            </Typography>
          </View>

          <QualitySelector
            item={this.props}
            variant={QualitySelector.VARIANT_DOWNLOAD}
            navigation={navigation}
          />
        </View>

        <Typography
          style={styles.summary}
          variant={'caption'}>
          {synopsis}
        </Typography>

      </View>
    )
  }
}
