import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import posterHolderImage from 'images/posterholder.png'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import BaseButton from '../BaseButton'
import Typography from '../Typography'
import Overlay from '../Overlay'

const styles = StyleSheet.create({

  root: {
    width : dimensions.MY_EPISODE_CARD_WIDTH,
    height: dimensions.MY_EPISODE_CARD_HEIGHT,

    borderRadius   : dimensions.BORDER_RADIUS,
    backgroundColor: colors.BACKGROUND_LIGHTER,
    overflow       : 'hidden',
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  placeholderImage: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'center',
  },

  iconContainer: {
    position: 'absolute',
    height  : '100%',
    width   : '100%',
    opacity : 0.8,
    display : 'flex',

    alignItems    : 'center',
    justifyContent: 'center',
  },

  episodeNumberContainer: {
    position : 'absolute',
    height   : '100%',
    width    : '100%',
    opacity  : 0.8,
    display  : 'flex',
    marginTop: (dimensions.ICON_PLAY_SMALL / 2) + dimensions.UNIT,

    alignItems    : 'center',
    justifyContent: 'center',
  },

  episodeInfoContainer: {
    position: 'absolute',
    bottom  : dimensions.UNIT,
    left    : dimensions.UNIT,
    width   : '90%',
  },

})

export default class Card extends React.PureComponent {

  constructor(props) {
    super(props)

    const { item, empty } = props

    this.state = {
      showPlaceholder: empty || !item.images.poster.thumb,
    }
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }

  getImage = () => {
    const { item, empty } = this.props
    const { showPlaceholder } = this.state

    if (showPlaceholder || empty) {
      return posterHolderImage
    }

    return { uri: item.images.poster.thumb }
  }

  getEpisodeNumber = () => {
    const { item } = this.props

    const season = `0${item.season}`
    const episode = `0${item.number}`

    return `S${season.slice(-2)}E${episode.slice(-2)}`
  }

  render() {
    const { item, empty, ...rest } = this.props
    const { showPlaceholder } = this.state

    return (
      <BaseButton
        // onLongPress={() => console.warn(item.title)}
        // onPress={() => this.openItem(item)}
        {...rest}>
        <View style={styles.root}>
          <Image
            style={[
              showPlaceholder
                ? styles.placeholderImage
                : styles.image,
            ]}
            source={this.getImage(item)} />

          <Overlay />

          <View style={styles.iconContainer}>
            <Icon
              name={'play-circle-outline'}
              color={'#FFF'}
              size={45} />
          </View>

          <View style={styles.episodeNumberContainer}>
            <Typography
              fontWeight={'medium'}
              variant={'caption'}>
              {this.getEpisodeNumber()}
            </Typography>
          </View>

          <View style={styles.episodeInfoContainer}>
            <Typography
              textProps={{
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              }}
              fontWeight={'medium'}
              variant={'subheading'}>
              {`${item.show.title}: ${item.title}`}
            </Typography>
          </View>

        </View>
      </BaseButton>
    )
  }
}
