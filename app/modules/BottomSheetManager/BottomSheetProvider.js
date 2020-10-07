import React from 'react'
import { StyleSheet, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import ReAnimated from 'react-native-reanimated'

import useBackButton from 'modules/hooks/useBackButton'

import Container from 'components/Container'

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

export const BottomSheetContext = React.createContext(null)

export const useBottomSheet = () => React.useContext(BottomSheetContext)

export const BottomSheetProvider = ({ children }) => {
  const sheetRef = React.useRef(null)
  const [fall] = React.useState(new ReAnimated.Value(1))
  const [visible, toggleVisible] = React.useState(false)

  const [bottomSheetConfig, setBottomSheetConfig] = React.useState({
    renderContent: () => null,
    borderRadius: 10,
    snapPoints: [400, 400, 0],
    biggestSnapPoint: 400,
    contentHeight: 400,
    onClose: null,
  })

  const handleBottomSheetOpen = React.useCallback(() => {
    toggleVisible(true)
  }, [])

  const handleBottomSheetClose = React.useCallback(() => {
    toggleVisible(false)

    if (bottomSheetConfig.onClose) {
      bottomSheetConfig.onClose()
    }
  }, [bottomSheetConfig.onClose])

  useBackButton(() => {
    if (visible && sheetRef.current) {
      closeBottomSheet()

      return true
    }

    return false
  })

  const updateBottomSheet = (config, force = false) => {
    if (visible || force) {
      setBottomSheetConfig({
        ...bottomSheetConfig,
        ...config,

        biggestSnapPoint: config.contentHeight || config.snapPoints.reduce((biggest, current) => (
          current > biggest
            ? current
            : biggest
        ), 0),
      })
    }
  }

  const openBottomSheet = (config) => {
    updateBottomSheet(config, true)

    // if we are already visible it can be content changes
    if (!visible) {
      sheetRef.current.snapTo(0)
    }
  }

  const closeBottomSheet = () => {
    sheetRef.current.snapTo(bottomSheetConfig.snapPoints.length - 1)
  }

  return (
    <BottomSheetContext.Provider value={[openBottomSheet, updateBottomSheet, closeBottomSheet]}>

      {children}

      <ReAnimated.View
        pointerEvents={
          visible
            ? 'auto'
            : 'none'
        }
        style={{
          ...styles.overlayContainer,
          opacity: ReAnimated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.8, 0],
          }),
        }}>
        <View style={[styles.overlayContainer, styles.overlay]} />
      </ReAnimated.View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={bottomSheetConfig.snapPoints}
        borderRadius={bottomSheetConfig.borderRadius}
        enabledContentTapInteraction={false}
        callbackNode={fall}
        onOpenStart={handleBottomSheetOpen}
        onCloseEnd={handleBottomSheetClose}
        initialSnap={bottomSheetConfig.snapPoints.length - 1}
        renderContent={() => (
          <Container
            elevation={1}
            style={{
              height: bottomSheetConfig.biggestSnapPoint,
            }}>
            {visible && bottomSheetConfig.renderContent()}
          </Container>
        )}
      />
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider
