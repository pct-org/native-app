import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import withApollo from 'modules/GraphQL/withApollo'
import { RemoveDownloadMutation, StartDownloadMutation } from 'modules/GraphQL/DownloadGraphQL'

import Card from 'components/Card'
import Typography from 'components/Typography'
import Modal from 'components/Modal'

import Qualities from './Qualities'
import QualityIcon from './QualityIcon'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  itemContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: dimensions.UNIT * 9,
    paddingLeft: dimensions.UNIT * 2,
    paddingRight: dimensions.UNIT * 2,
  },

  title: {
    marginTop: dimensions.UNIT * 3,
    textAlign: 'center',
  },

})

@withApollo
export default class QualitySelector extends React.Component {

  static VARIANT_PLAY = 'play'
  static VARIANT_DOWNLOAD = 'download'

  static propTypes = {
    style: PropTypes.object,
    variant: PropTypes.oneOf(['play', 'download']),
    navigation: PropTypes.object.isRequired,
    apollo: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    itemType: PropTypes.string,
  }

  static defaultProps = {
    style: {},
    variant: 'play',
    itemType: null,
  }

  static getDerivedStateFromProps(props, state) {
    const { item, visible } = props

    let download = state.download || null

    if (item.download && item.download.downloadStatus && !state.download) {
      download = {
        status: item.download.downloadStatus,
        progress: 0,
      }
    }

    return {
      visible: visible || state.visible,
      download,
    }
  }

  state = {
    visible: false,
    download: null,
  }

  /**
   * Starts playing this torrent
   *
   * @param torrent
   */
  handlePlayTorrent = (torrent) => {
    const { playItem, item, navigation: { navigate } } = this.props

    if (playItem) {
      playItem(item, torrent.quality)

    } else {
      navigate(
        'Player',
        {
          playQuality: torrent.quality,
          item,
        },
      )
    }
  }

  handleRequestClose = () => {
    const { onRequestClose } = this.props

    if (onRequestClose) {
      onRequestClose()
    }

    this.setState({
      visible: false,
    })
  }

  handleOnIconPress = () => {
    const { download } = this.state

    if (download) {
      this.handlePlayTorrent({
        quality: 'download',
      })

    } else {
      this.setState({
        visible: true,
      })
    }
  }

  /**
   * Starts the download
   *
   * @param quality
   * @return {Promise<void>}
   */
  handleStartDownload = async(quality) => {
    const { apollo, item } = this.props

    const { data: { download } } = await apollo.mutate({
      variables: {
        _id: item._id,
        itemType: item.type,
        quality,
      },
      mutation: StartDownloadMutation,
    })

    this.setState({
      download,
      visible: false,
    })
  }

  /**
   * Removes the download
   *
   * @return {Promise<void>}
   */
  handleRemoveDownload = async() => {
    const { apollo, item } = this.props

    apollo.mutate({
      variables: {
        _id: item._id,
      },
      mutation: RemoveDownloadMutation,
    })

    this.setState({
      download: null,
    })
  }

  isVisible = () => {
    const { visible } = this.state

    return visible
  }

  render() {
    const { itemType, variant, style, item } = this.props
    const { visible, download } = this.state

    return (
      <React.Fragment>
        <QualityIcon
          item={item}
          itemType={itemType}
          variant={variant}
          style={style}
          download={download}
          handleOnPress={this.handleOnIconPress}
          handleStartDownload={this.handleStartDownload}
          handleRemoveDownload={this.handleRemoveDownload}
        />

        <Modal
          onRequestClose={this.handleRequestClose}
          visible={visible}>

          {item && item.title && (
            <Animatable.View
              style={styles.itemContainer}
              animation={'fadeIn'}
              duration={200}
              useNativeDriver>
              <Card
                item={
                  item.type === 'movie'
                    ? item
                    : item.show
                }
                onPress={null}
              />

              <Typography
                style={styles.title}
                variant={'headline5'}>
                {item.type === 'movie'
                  ? item.title
                  : `${item.show.title}: ${item.title}`
                }
              </Typography>

            </Animatable.View>
          )}

          <Qualities
            item={item}
            variant={variant}
            handleQualityPress={(torrent) => {
              if (variant === QualitySelector.VARIANT_PLAY) {
                this.handlePlayTorrent(torrent)

              } else {
                this.handleStartDownload(torrent.quality)
              }
            }}
          />
        </Modal>
      </React.Fragment>
    )
  }

}
