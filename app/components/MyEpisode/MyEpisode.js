import React, { useState, createRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import {withNavigation} from 'react-navigation'

import dimensions from 'modules/dimensions'
import QualitySelector from 'mobile/components/QualitySelector'

import Container from '../Container'
import BaseButton from '../BaseButton'
import Typography from '../Typography'
import Overlay from '../Overlay'
import Image from '../Image'

const styles = StyleSheet.create({

  root: {
    height: dimensions.MY_EPISODE_CARD_HEIGHT,
    width: dimensions.MY_EPISODE_CARD_WIDTH,
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
    margin: dimensions.UNIT,
  },

  iconContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.8,
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
  },

  episodeNumberContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: dimensions.UNIT + 16,
    left: dimensions.UNIT,
  },

  episodeInfoContainer: {
    position: 'absolute',
    bottom: dimensions.UNIT,
    left: dimensions.UNIT,
    width: '90%',
  },

})

export const MyEpisode = ({ item, style, empty, navigation, ...rest }) => {
  const playSelectorRef = createRef()

  const getEpisodeNumber = () => {
    const season = empty ? '00' : `0${item.season}`
    const episode = empty ? '00' : `0${item.number}`

    return `S${season.slice(-2)}E${episode.slice(-2)}`
  }

  return (
    <Container
      elevation={1}
      style={[styles.root, style]}>
      <BaseButton
        onPress={() => {
          if (!empty && playSelectorRef && playSelectorRef.current) {
            playSelectorRef.current.handleOnIconPress()
          }
        }}
        {...rest}>
        <View>
          <Image images={
            empty
              ? {}
              : item.images
          } />

          {!empty && (
            <Overlay variant={'dark'} />
          )}

          {!empty && (
            <Animatable.View
              animation={'fadeIn'}
              style={styles.iconContainer}
              useNativeDriver>
              <QualitySelector
                onRef={playSelectorRef}
                itemType={'my-episode'}
                item={item}
              />
            </Animatable.View>
          )}

          {!empty && (
            <React.Fragment>
              <Animatable.View
                animation={'fadeIn'}
                style={styles.episodeNumberContainer}
                useNativeDriver>
                <Typography
                  variant={'caption'}>
                  {getEpisodeNumber()}
                </Typography>
              </Animatable.View>

              <Animatable.View
                animation={'fadeIn'}
                style={styles.episodeInfoContainer}
                useNativeDriver>
                <Typography
                  textProps={{
                    numberOfLines: 1,
                    ellipsizeMode: 'tail',
                  }}
                  variant={'caption'}>
                  {`${item.show.title}: ${item.title}`}
                </Typography>
              </Animatable.View>
            </React.Fragment>
          )}

        </View>
      </BaseButton>
    </Container>
  )
}

MyEpisode.propTypes = {
  style: PropTypes.object,
}

MyEpisode.defaultProps = {
  style: null,
}

export default withNavigation(MyEpisode)
