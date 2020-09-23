import * as React from 'react'
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import TextButton from '../TextButton'
import Portal from '../Portal'
import Typography from '../Typography'

const styles = StyleSheet.create({

  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  container: {
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: dimensions.UNIT * 2,
    borderRadius: dimensions.BORDER_RADIUS,
    backgroundColor: colors.BACKGROUND_SNACKBAR,
    minHeight: dimensions.getHeight(40),
  },

  content: {
    marginLeft: dimensions.UNIT * 2,
    marginVertical: dimensions.UNIT,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  label: {
    flex: 1,
  },

  button: {},

})

const Snackbar = ({
  visible,
  action,
  duration,
  onDismiss,
  children,
  wrapperStyle,
  style,
  ...rest
}) => {
  const { current: opacity } = React.useRef(
    new Animated.Value(0.0),
  )
  const [hidden, setHidden] = React.useState(!visible)

  const hideTimeout = React.useRef(undefined)

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }
    }
  }, [])

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }

      setHidden(false)

      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(onDismiss, duration)
          }
        }
      })
    } else {
      // hide
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setHidden(true)
        }
      })
    }
  }, [visible, duration, opacity, onDismiss])

  if (hidden) {
    return null
  }

  return (
    <Portal>
      <SafeAreaView
        pointerEvents="box-none"
        style={[styles.wrapper, wrapperStyle]}>
        <Animated.View
          pointerEvents="box-none"
          style={
            [
              styles.container,
              {
                opacity: opacity,
                transform: [
                  {
                    scale: visible
                      ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                      : 1,
                  },
                ],
              },
              style,
            ]
          }
          {...rest}>
          <View style={styles.content}>
            <Typography
              style={styles.label}
              variant={'body2'}
              color={'black'}>
              {children}
            </Typography>

            {action && (
              <TextButton
                onPress={() => {
                  action.onPress()
                  onDismiss()
                }}
                color={'black'}
                style={styles.button}>
                {action.label}
              </TextButton>
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </Portal>
  )
}

/**
 * Show the Snackbar for a short duration.
 */
Snackbar.DURATION_SHORT = 1500

/**
 * Show the Snackbar for a long duration.
 */
Snackbar.DURATION_LONG = 5000

Snackbar.defaultProps = {
  duration: Snackbar.DURATION_SHORT,
}

export default Snackbar
