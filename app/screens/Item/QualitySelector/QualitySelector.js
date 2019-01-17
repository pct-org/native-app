import React from 'react'
import { StyleSheet, View, Text, BackHandler } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'

import BaseButton from 'components/BaseButton'
import IconButton from 'components/IconButton'

import colors from 'modules/colors'

const styles = StyleSheet.create({

  root: {
    flex    : 1,
    position: 'absolute',
    top     : 0,
    left    : 0,
    width   : '100%',
    height  : '100%',
  },

  container: {
    opacity        : 0.9,
    display        : 'flex',
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: colors.BACKGROUND,
  },

  closeIcon: {
    position: 'absolute',
    top     : 34,
    right   : 14,
  },

  quality: {
    ...material.titleWhiteObject,
    margin: 8,
  },

})

export default class QualitySelector extends React.Component {

  state = {
    hidden   : true,
    animation: 'fadeIn',
  }

  handleCancel = () => {
    this.setState({
      animation: 'fadeOut',
    })
  }

  playQuality = (quality) => {
    const { playItem, torrents } = this.props

    playItem(torrents.find(torrent => torrent.quality === quality))
  }

  handleAnimationEnd = () => {
    const { torrents } = this.props
    const { animation } = this.state

    const hidden = !torrents || animation === 'fadeOut'

    this.setState({
      hidden,
      animation: 'fadeIn',
    }, () => {
      if (hidden) {
        const { cancel } = this.props

        cancel()
      }
    })
  }

  handleAnimationBegin = () => {
    this.setState({
      hidden: false,
    })
  }

  render() {
    const { torrents } = this.props
    const { animation } = this.state

    return (
      <Animatable.View
        animation={torrents && torrents.length > 0 ? animation : null}
        duration={200}
        style={[styles.root]}
        pointerEvents={!torrents ? 'none' : null}
        onAnimationBegin={this.handleAnimationBegin}
        onAnimationEnd={this.handleAnimationEnd}
        useNativeDriver>

        {torrents && torrents.length > 0 && (
          <View style={[styles.root, styles.container]}>
            <View style={styles.closeIcon}>
              <IconButton
                onPress={this.handleCancel}
                name={'close'}
                color={'#FFF'}
                size={40}
              />
            </View>

            {torrents.map((torrent) => (
              <BaseButton
                key={torrent._id}
                onPress={() => this.playQuality(torrent.quality)}>
                <Text style={styles.quality}>
                  {torrent.quality}
                </Text>
              </BaseButton>
            ))}
          </View>
        )}

      </Animatable.View>
    )
  }

}
