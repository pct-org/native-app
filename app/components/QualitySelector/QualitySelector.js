import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import BaseButton from 'components/BaseButton'
import Button from 'components/Button'
import Typography from 'components/Typography'
import Modal from 'components/Modal'

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

  listContainer: {
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

@withNavigation
export default class QualitySelector extends React.Component {

  static getDerivedStateFromProps(props) {
    if (props.item && props.item.torrents) {
      return {
        qualities: Object.keys(props.item.torrents).filter(
          quality => !!props.item.torrents[quality],
        ),
      }
    }

    return {
      qualities: [],
    }
  }

  static propTypes = {
    style: PropTypes.object,

    isMyEpisode   : PropTypes.bool,
    fetchingBetter: PropTypes.bool,
  }

  static defaultProps = {
    iconSize: dimensions.ICON_PLAY_MEDIUM,
    style   : {},

    isMyEpisode   : false,
    fetchingBetter: false,
  }

  state = {
    qualities: [],
  }

  handlePlayQuality = (quality) => {
    const { item, onRequestClose, fetchingBetter, navigation: { navigate } } = this.props

    if (!fetchingBetter) {
      // Close the selector
      onRequestClose()

      navigate('Player', {
        torrent: item.torrents[quality],
        item,
      })
    }
  }

  handleSearchForBetter = () => {
    const { fetchedBetterOnes, item, isMyEpisode } = this.props

    fetchedBetterOnes(
      item.show
        ? item.show
        : item,

      item.show
        ? item
        : null,

      isMyEpisode,
    )
  }

  render() {
    const { visible, onRequestClose, iconSize } = this.props
    const { item, style, fetchingBetter } = this.props
    const { qualities } = this.state

    const searchedForBetter = item ? item.searchedForBetter : false

    return (
      <React.Fragment>

        <Icon
          style={style}
          name={'play-circle-outline'}
          color={colors.ICON_COLOR}
          size={iconSize} />

        <Modal
          onRequestClose={onRequestClose}
          visible={visible}>

          {qualities.length === 0 && (
            <Typography variant={'title'}>
              {i18n.t('No qualities available! Try to search')}
            </Typography>
          )}

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

          {!searchedForBetter && (
            <Animatable.View
              animation={!fetchingBetter ? 'fadeIn' : 'fadeOut'}
              duration={!fetchingBetter ? 0 : 200}
              style={styles.searchForBetter}
              useNativeDriver>
              <Button
                onPress={this.handleSearchForBetter}
                variant={'primary'}>
                {qualities.length > 0
                  ? i18n.t('search for better')
                  : i18n.t('search for qualities')
                }
              </Button>
            </Animatable.View>
          )}

          {qualities.map((quality) => (
            <Animatable.View
              key={quality}
              animation={'fadeIn'}
              duration={200}
              useNativeDriver>
              <BaseButton onPress={() => this.handlePlayQuality(quality)}>
                <Text style={[
                  styles.quality,
                  // {
                  //   borderBottomColor: item.torrents
                  //     ? item.torrents[quality].health.color
                  //     : null,
                  // },
                ]}>
                  {quality}
                </Text>
              </BaseButton>
            </Animatable.View>
          ))}

        </Modal>

      </React.Fragment>
    )

  }

}
