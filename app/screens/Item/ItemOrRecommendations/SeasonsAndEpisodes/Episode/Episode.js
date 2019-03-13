import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import posterHolderImage from 'images/posterholder.png'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'

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
  },

  image: {
    width     : dimensions.EPISODE_CARD_WIDTH,
    height    : dimensions.EPISODE_CARD_HEIGHT,
    resizeMode: 'cover',
  },

  placeholderImage: {
    width     : dimensions.EPISODE_CARD_WIDTH,
    height    : dimensions.EPISODE_CARD_HEIGHT,
    resizeMode: 'center',
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

  constructor(props) {
    super(props)

    const { images, empty } = props

    this.state = {
      showPlaceholder: empty || !images.poster.thumb,
    }
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }

  handlePlayItem = () => {
    const { playItem, hasAired, ...episode } = this.props

    if (hasAired) {
      playItem(episode.torrents, this.props)
    }
  }

  getImage = () => {
    const { images, empty } = this.props
    const { showPlaceholder } = this.state

    if (showPlaceholder || empty || !images.poster.thumb) {
      return posterHolderImage
    }

    return { uri: images.poster.thumb }
  }

  getAirsDate = () => {
    const { aired } = this.props

    const airs = new Date()
    airs.setTime(aired)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  render() {
    const { title, summary, number, hasAired } = this.props
    const { showPlaceholder } = this.state

    return (
      <View style={styles.listContainer}>

        <View style={styles.posterWithTitle}>
          <View style={styles.posterContainer}>
            <BaseButton onPress={this.handlePlayItem}>
              <View>
                <Image
                  onError={this.handleImageError}
                  source={this.getImage()}
                  style={
                    showPlaceholder
                      ? styles.placeholderImage
                      : styles.image
                  } />

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
