import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Mutation } from '@apollo/react-components'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import DownloadGraphQL, { RemoveDownloadMutation, StartDownloadMutation } from 'modules/GraphQL/DownloadGraphQL'

import Card from 'components/Card'
import Icon from 'components/Icon'
import IconButton from 'components/IconButton'
import Typography from 'components/Typography'
import Modal from 'components/Modal'
import TextButton from 'components/TextButton'


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
export default class QualitySelector extends React.Component {

  static VARIANT_PLAY = 'play'
  static VARIANT_DOWNLOAD = 'download'

  static propTypes = {
    style: PropTypes.object,
    fetchingBetter: PropTypes.bool,
    variant: PropTypes.oneOf(['play', 'download']),
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {},
    variant: QualitySelector.VARIANT_PLAY,
  }

  state = {
    visible: false,
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
    this.setState({
      visible: false,
    })
  }

  handleOnIconPress = () => {
    const { item } = this.props

    if (item.download && (item.download.downloading || item.download.downloadComplete)) {
      this.handlePlayTorrent({
        quality: 'download',
      })

    } else {
      this.setState({
        visible: true,
      })
    }
  }

  isVisible = () => {
    const { visible } = this.state

    return visible
  }

  render() {
    const { itemType, variant, style, item } = this.props
    const { visible } = this.state

    const mutationVariables = {
      _id: item._id,
    }

    return (
      <Mutation
        mutation={StartDownloadMutation}
        variables={mutationVariables}>
        {(startDownload, { data }) => (
          <React.Fragment>
            <Mutation
              mutation={RemoveDownloadMutation}
              variables={mutationVariables}>
              {(removeDownload) => (
                <QualityIcon
                  item={item}
                  itemType={itemType}
                  variant={variant}
                  style={style}
                  download={
                    data
                      ? data.download
                      : null
                  }
                  handleOnPress={this.handleOnIconPress}
                  handleStartDownload={startDownload}
                  handleRemoveDownload={removeDownload}
                />
              )}
            </Mutation>

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
                    this.handleRequestClose()

                    startDownload({
                      variables: {
                        _id: item._id,
                        itemType: item.type,
                        quality: torrent.quality,
                      },
                    })
                  }
                }}
              />
            </Modal>
          </React.Fragment>
        )}
      </Mutation>
    )
  }

}
