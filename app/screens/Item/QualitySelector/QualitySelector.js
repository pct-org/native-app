import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
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

  static getDerivedStateFromProps(props) {
    if (props.torrents) {
      return {
        qualities: Object.keys(props.torrents).filter(quality => !!props.torrents[quality]),
      }
    }

    return {}
  }

  state = {
    hidden   : false,
    qualities: null,
  }

  playQuality = (quality) => {
    const { playItem, torrents } = this.props

    playItem(torrents[quality])
  }

  handleAnimationEnd = () => {
    const { torrents } = this.props

    this.setState({
      hidden: !torrents,
    })
  }

  handleAnimationBegin = () => {
    this.setState({
      hidden: false,
    })
  }

  render() {
    const { torrents, cancel } = this.props
    const { hidden, qualities } = this.state

    if (hidden && !torrents) {
      return null
    }

    return (
      <Animatable.View
        animation={torrents ? 'fadeIn' : 'fadeOut'}
        duration={200}
        style={[styles.root]}
        onAnimationBegin={this.handleAnimationBegin}
        onAnimationEnd={this.handleAnimationEnd}
        useNativeDriver>

        {qualities && (
          <View style={[styles.root, styles.container]}>
            <View style={styles.closeIcon}>
              <IconButton
                onPress={cancel}
                name={'close'}
                color={'#FFF'}
                size={40}
              />
            </View>

            {qualities.map((quality) => (
              <BaseButton
                key={quality}
                onPress={() => this.playQuality(quality)}>
                <Text style={styles.quality}>
                  {quality}
                </Text>
              </BaseButton>
            ))}
          </View>
        )}

      </Animatable.View>
    )
  }

}
