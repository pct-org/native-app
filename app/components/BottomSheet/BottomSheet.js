import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import ReanimatedBottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

import useBackButton from 'modules/hooks/useBackButton'

import Container from '../Container'
import Portal from '../Portal'

export const styles = StyleSheet.create({

  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  overlay: {
    backgroundColor: 'black',
  },

})

export const BottomSheet = React.forwardRef(({ children, contentHeight, renderHeader, snapPoints }, ref) => {
  const [fall] = React.useState(new Animated.Value(1))
  const [visible, toggleVisible] = React.useState(false)

  const biggestSnapPoint = contentHeight || snapPoints.reduce((biggest, current) => current > biggest ? current
    : biggest, 0)

  const handleBottomSheetOpen = React.useCallback(() => {
    toggleVisible(true)
  }, [])

  const handleBottomSheetClose = React.useCallback(() => {
    toggleVisible(false)
  }, [])

  const forceCloseBottomSheet = () => {
    if (ref.current) {
      ref.current.snapTo(snapPoints.length - 1)
    }
  }

  useBackButton(() => {
    if (visible && ref.current) {
      forceCloseBottomSheet()

      return true
    }

    return false
  })

  return (
    <Portal>
      <Animated.View
        pointerEvents={
          visible
            ? 'auto'
            : 'none'
        }
        style={{
          ...styles.overlayContainer,
          opacity: Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.8, 0],
          }),
        }}>
        <View style={[styles.overlayContainer, styles.overlay]} />
      </Animated.View>

      <ReanimatedBottomSheet
        ref={ref}
        snapPoints={snapPoints}
        borderRadius={10}
        initialSnap={snapPoints.length - 1}
        enabledContentTapInteraction={false}
        callbackNode={fall}
        onOpenStart={handleBottomSheetOpen}
        onCloseEnd={handleBottomSheetClose}
        renderHeader={renderHeader}
        renderContent={() => (
          <Container
            elevation={1}
            style={{
              height: biggestSnapPoint,
            }}>
            {children}
          </Container>
        )}
      />
    </Portal>
  )
})

BottomSheet.propTypes = {
  snapPoints: PropTypes.array,
}

BottomSheet.defaultProps = {
  snapPoints: [400, 0],
  contentHeight: null,
}

export default BottomSheet
