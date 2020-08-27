import React from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet, View, Easing } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions, { getWidth } from 'modules/dimensions'
import { withFocusManager } from 'tv/modules/FocusManager'
import constants from 'modules/constants'
import colors from 'modules/colors'

import Icon from 'components/Icon'
import CoverGradient from 'components/CoverGradient'
import Overlay from 'components/Overlay'
import Typography from 'components/Typography'
import Button from 'components/Button'

import Bar from './Bar'
import QualitySelector from 'mobile/components/QualitySelector'

const styles = StyleSheet.create({

  mainContainer: {
    position: 'relative',
    height: dimensions.SCREEN_HEIGHT,
    width: dimensions.SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: '100%',
    width: '100%',
  },

  itemInfoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: dimensions.getWidth(150),
    paddingRight: dimensions.getWidth(150),
  },

  barsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: dimensions.SCREEN_HEIGHT / 3,
    paddingLeft: dimensions.getWidth(140),
    paddingRight: dimensions.getWidth(140),
    width: '100%',
  },
})

export const fromTransformScale = 1.20
export const transitionDuration = 10000
// export const transitionDuration = 5000

export const MainSlider = ({ activeItem, items, nextItem, focusManager }) => {
  // TODO:: Make the direction random, (in out left right etc)
  // TODO:: Active bar item should fade in / out
  // TODO:: Background image should fade in / out better (over the old one)
  // TODO:: Better text transitions?
  const [state, setState] = React.useState({
    transformScale: new Animated.Value(fromTransformScale),
    withAnimation: true,
    firstAnimation: true,
  })

  React.useEffect(() => {
    console.log('focus manager got dirty stop all animations')

    if (focusManager.dirty) {
      Animated.timing(
        state.transformScale,
      ).stop()

      setState({
        transformScale: new Animated.Value(1.10),
        withAnimation: false,
      })
    }

  }, [focusManager.dirty])

  React.useEffect(() => {
    if (state.withAnimation) {
      Animated.timing(
        state.transformScale, // The animated value to drive
        {
          toValue: 1,
          easing: Easing.linear,
          duration: transitionDuration,
          useNativeDriver: true,
        },
      ).start(() => {
        if (!state.firstAnimation) {
          focusManager.toRight()
        }
      })
    }
  }, [state])

  const startAnimation = React.useCallback(() => {
    if (state.withAnimation) {
      setState({
        transformScale: new Animated.Value(fromTransformScale),
        withAnimation: true,
        firstAnimation: false,
      })
    }
  }, [state])

  return (
    <View style={styles.mainContainer}>

      <Animated.Image
        resizeMode={'contain'}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: dimensions.SCREEN_WIDTH,
          height: dimensions.SCREEN_HEIGHT,
          transform: [{ scale: state.transformScale }],
        }}
        source={{
          uri: activeItem?.images?.poster?.full ?? activeItem?.show?.images?.backdrop?.full,
        }}
      />

      <Overlay variant={'medium'} />

      {activeItem && (
        <View style={styles.itemInfoContainer}>
          <Typography
            fontWeight={'medium'}
            variant={'headline5'}>
            {activeItem.show.title}
          </Typography>

          <Typography
            variant={'caption'}
            emphasis={'low'}
            textProps={{
              width: '100%',
              numberOfLines: 2,
              ellipsizeMode: 'tail',
            }}>
            {`S${`0${activeItem.season}`.slice(-2)}E${`0${activeItem.number}`.slice(-2)}. ${activeItem.title}`}
          </Typography>
        </View>
      )}

      {activeItem && (
        <View style={styles.barsContainer}>
          {items.map((item, index) => (
            <Bar
              key={item._id}
              index={index}
              focusManager={focusManager}
              setActive={() => nextItem(item)}
              amount={items.length}
              onFocus={startAnimation}
            />
          ))}
        </View>
      )}
    </View>
  )
}

MainSlider.propTypes = {
  loading: PropTypes.bool,
  item: PropTypes.object,
}

MainSlider.defaultProps = {
  loading: false,
  item: null,
}

export default withFocusManager(MainSlider)
