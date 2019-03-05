import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'

import i18n from 'modules/i18n'

import BaseButton from 'components/BaseButton'
import Button from 'components/Button'
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

  qualityContainer: {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    flexDirection : 'row',
  },

  quality: {
    ...material.titleWhiteObject,
    margin: 8,

    borderBottomWidth: 1,
  },

  searchForBetter: {
    position: 'absolute',
    bottom  : 20,
  },

  fetchingBetter: {
    position: 'absolute',
    top     : 100,
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

  static defaultProps = {
    myEpisodesScreen:false,
  }

  state = {
    hidden   : false,
    qualities: null,
  }

  playQuality = (quality) => {
    const { playItem, torrents, fetchingBetter } = this.props

    if (!fetchingBetter) {
      playItem(torrents[quality])
    }
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

  handleSearchForBetter = () => {
    const { fetchedBetterOnes, item, episodeToPlay, myEpisodesScreen } = this.props

    fetchedBetterOnes(
      item.show
        ? item.show
        : item,

      episodeToPlay,
      myEpisodesScreen
    )
  }

  render() {
    const { torrents, cancel, fetchingBetter } = this.props
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

            {fetchingBetter && (
              <Animatable.View
                animation={'fadeIn'}
                duration={200}
                style={styles.fetchingBetter}
                useNativeDriver>
                <ActivityIndicator
                  size={60}
                  color={'#FFF'} />
              </Animatable.View>
            )}

            <View style={styles.searchForBetter}>
              <Button
                onPress={this.handleSearchForBetter}
                variant={'primary'}>
                {i18n.t('search for better')}
              </Button>
            </View>

            {qualities.map((quality) => (
              <BaseButton
                key={quality}
                onPress={() => this.playQuality(quality)}>
                <Text style={[
                  styles.quality,
                  {
                    borderBottomColor: torrents
                      ? torrents[quality].health.color
                      : null,
                  },
                ]}>
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
