import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { navigate } from 'modules/RootNavigation'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import withDownloadManager from 'modules/DownloadManager/withDownloadManager'

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

@withDownloadManager
export default class QualitySelector extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    variant: PropTypes.oneOf([
      constants.TYPE_STREAM,
      constants.TYPE_DOWNLOAD,
      'downloads',
    ]),
    item: PropTypes.object.isRequired,
    itemType: PropTypes.string,
    downloadManager: PropTypes.shape({
      startDownload: PropTypes.func.isRequired,
      updateDownload: PropTypes.func.isRequired,
      getDownload: PropTypes.func.isRequired,
      downloadExists: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    style: {},
    variant: constants.TYPE_STREAM,
    itemType: null,
  }

  static getDerivedStateFromProps(props, state) {
    const { item } = props

    let download = state.download || null

    if (item.download && item.download.downloadStatus && !state.download && !state.removed) {
      download = {
        _id: item._id,
        status: item.download.downloadStatus,
        quality: item.download.downloadQuality,
        progress: 0,
      }
    }

    return {
      visible: state.visible,
      removed: state.removed,
      download,
    }
  }

  state = {
    visible: false,
    download: null,
    removed: false,
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { visible: wasVisible } = prevProps
    const { visible } = this.props

    if (wasVisible !== visible && visible) {
      this.handleOnIconPress()
    }
  }

  /**
   * Starts playing this torrent
   *
   * @param torrent
   */
  handlePlayTorrent = (torrent) => {
    const { playItem, item } = this.props

    if (playItem) {
      playItem(item, torrent.quality)

    } else {
      // Make sure whe are closed
      this.handleRequestClose()

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
    const { downloadManager, item } = this.props

    // Check if download status is not null or failed
    const hasDownload = ![null, 'failed'].includes(item.download.downloadStatus)

    // If we have download or the manager has one, play the download
    if (hasDownload || downloadManager.downloadExists(item._id)) {
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
    const { item, downloadManager } = this.props

    const download = await downloadManager.startDownload(item, quality)

    this.setState({
      download,
      visible: false,
      removed: false,
    })
  }

  /**
   * Removes the download
   *
   * @return {Promise<void>}
   */
  handleRemoveDownload = async() => {
    const { item, downloadManager } = this.props

    await downloadManager.removeDownload(item)

    this.setState({
      download: null,
      removed: true,
    })
  }

  render() {
    const { itemType, variant, style, item, downloadManager } = this.props
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
          downloadManager={downloadManager}
        />

        {variant !== 'downloads' && (
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
                  {
                    item.type === 'movie'
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
                if (variant === constants.TYPE_STREAM) {
                  this.handlePlayTorrent(torrent)

                } else {
                  this.handleStartDownload(torrent.quality)
                }
              }}
            />
          </Modal>
        )}
      </React.Fragment>
    )
  }

}
