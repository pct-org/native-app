import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'
import Image from 'components/Image'

export const styles = StyleSheet.create({

  listContainer: {
    display: 'flex',
  },

  posterContainer: {
    borderRadius: dimensions.BORDER_RADIUS,
    overflow    : 'hidden',

    backgroundColor: colors.BACKGROUND_LIGHTER,
  },

  posterWithTitle: {
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
  },

  iconContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  title: {
    marginLeft: dimensions.UNIT,
  },

  summary: {
    marginTop: dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT / 2,
  },

  image: {
    width : dimensions.EPISODE_CARD_WIDTH,
    height: dimensions.EPISODE_CARD_HEIGHT,
  },

})

export default class Episode extends React.Component {

  static propTypes = {
    playItem   : PropTypes.func.isRequired,
    title      : PropTypes.string,
    images     : PropTypes.object,
    torrents   : PropTypes.object,
    number     : PropTypes.number,
    summary    : PropTypes.string,
    hasTorrents: PropTypes.bool,
    hasAired   : PropTypes.bool,
  }

  static defaultProps = {
    summary    : null,
    hasTorrents: false,
    hasAired   : false,

    images: {
      poster: {
        thumb: null,
      },
    },
  }

  handlePlayItem = () => {
    const { playItem, hasAired, ...episode } = this.props

    if (hasAired) {
      playItem(episode.torrents, this.props)
    }
  }

  getAirsDate = () => {
    const { aired } = this.props

    const airs = new Date()
    airs.setTime(aired)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  render() {
    const { title, summary, number, hasAired, images } = this.props

    return (
      <View style={styles.listContainer}>

        <View style={styles.posterWithTitle}>
          <View style={styles.posterContainer}>
            <BaseButton onPress={this.handlePlayItem}>
              <View>
                <Image
                  style={styles.image}
                  images={images} />

                <View style={styles.iconContainer}>
                  <Overlay />

                  {hasAired && (
                    <Icon
                      iconStyle={{ margin: 0 }}
                      backgroundColor={'transparent'}
                      borderRadius={0}
                      name={'play-circle-outline'}
                      color={'#FFF'}
                      size={dimensions.ICON_PLAY_SMALL} />
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
          {summary}
        </Typography>

      </View>
    )
  }
}
