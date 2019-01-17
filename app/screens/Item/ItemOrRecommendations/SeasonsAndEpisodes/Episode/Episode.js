import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import posterHolderImage from 'images/posterholder.png'

import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import BaseButton from 'components/BaseButton'

export const styles = StyleSheet.create({

  container: {
    display: 'flex',
    margin : 8,
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
    marginLeft: 8,
  },

  summary: {
    marginTop: 8,
  },

})

export default class Episode extends React.Component {

  static propTypes = {
    playItem: PropTypes.func.isRequired,
    title   : PropTypes.string.isRequired,
    images  : PropTypes.object.isRequired,
    torrents: PropTypes.array.isRequired,
    number  : PropTypes.number.isRequired,
    synopsis: PropTypes.string,
  }

  static defaultProps = {
    synopsis: null,
    torrents: [],
  }

  state = {
    showPlaceholder: false,
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }

  handlePlayItem = () => {
    const { playItem, torrents, ...episode } = this.props

    if (torrents.length > 0) {
      playItem(torrents, episode)
    }
  }

  getAirsDate = () => {
    const { first_aired } = this.props

    const airs = new Date()
    airs.setTime(first_aired * 1000)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  render() {
    const { title, synopsis, number, images, hasAired, torrents } = this.props
    const { showPlaceholder } = this.props

    return (
      <View style={styles.container}>

        <View style={styles.posterWithTitle}>
          <BaseButton onPress={this.handlePlayItem}>
            <View>
              <Image
                onError={this.handleImageError}
                defaultSource={posterHolderImage}
                source={images.thumb && !showPlaceholder
                  ? { uri: images.thumb }
                  : posterHolderImage
                }
                style={{ width: 150, height: 100 }} />

              <View style={styles.iconContainer}>
                <Overlay />

                {hasAired && (
                  <Icon
                    iconStyle={{ margin: 0 }}
                    backgroundColor={'transparent'}
                    borderRadius={0}
                    name={torrents.length > 0 ? 'play-circle-outline' : 'cancel'}
                    color={torrents.length > 0 ? '#FFF' : 'red'}
                    size={60} />
                )}

                {!hasAired && (
                  <Typography variant={'caption'}>
                    {this.getAirsDate()}
                  </Typography>
                )}
              </View>
            </View>
          </BaseButton>

          <Typography style={styles.title}>
            {`${number}. ${title}`}
          </Typography>
        </View>

        <Typography style={styles.synopsis} variant={'caption'}>
          {synopsis}
        </Typography>

      </View>
    )
  }
}
