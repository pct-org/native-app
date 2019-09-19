import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'
import Image from 'components/Image'

import QualitySelector from 'mobile/components/QualitySelector'

export const styles = StyleSheet.create({

  listContainer: {
    display: 'flex',
  },

  posterContainer: {
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',

    backgroundColor: colors.BACKGROUND_LIGHTER,
  },

  posterWithTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginLeft: dimensions.UNIT,
  },

  summary: {
    marginTop: dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT / 2,
  },

  image: {
    width: dimensions.EPISODE_CARD_WIDTH,
    height: dimensions.EPISODE_CARD_HEIGHT,
  },

})

export default class Episode extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    images: PropTypes.object,
    number: PropTypes.number,
    synopsis: PropTypes.string,
    hasTorrents: PropTypes.bool,
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

  state = {
    showQualitySelector: false,
  }

  toggleSelector = (showQualitySelector) => {
    this.setState({
      showQualitySelector,
    })
  }

  getAirsDate = () => {
    const { firstAired } = this.props

    const airs = new Date()
    airs.setTime(firstAired)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  render() {
    const { title, synopsis, number, hasAired, images } = this.props
    const { showQualitySelector } = this.state

    return (
      <View style={styles.listContainer}>

        <View style={styles.posterWithTitle}>
          <View style={styles.posterContainer}>
            <BaseButton onPress={() => this.toggleSelector(!showQualitySelector)}>
              <View>
                <Image
                  style={styles.image}
                  images={images} />

                <View style={styles.iconContainer}>
                  <Overlay />

                  {hasAired && (
                    <QualitySelector
                      item={this.props}
                      iconSize={dimensions.ICON_PLAY_SMALL}
                      visible={showQualitySelector}
                      onRequestClose={() => this.toggleSelector(false)}
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
          </View>

          <Typography
            style={styles.title}
            variant={'subheading'}
            fontWeight={'bold'}>
            {`${number}. ${title}`}
          </Typography>
        </View>

        <Typography
          style={styles.summary}
          variant={'body2'}>
          {synopsis}
        </Typography>

      </View>
    )
  }
}
