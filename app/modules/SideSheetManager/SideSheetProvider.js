import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import ReAnimated from 'react-native-reanimated'

import useBackButton from 'modules/hooks/useBackButton'

import Container from 'components/Container'

import SideSheet from './SideSheet'

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

export const SideSheetContext = React.createContext(null)

export const useSideSheet = () => React.useContext(SideSheetContext)

export const SideSheetProvider = ({ children }) => {
  const sheetRef = React.useRef(null)
  const [fall] = React.useState(new ReAnimated.Value(1))
  const [visible, toggleVisible] = React.useState(false)

  const [bottomSheetConfig, setBottomSheetConfig] = React.useState({
    renderContent: () => null,
    borderRadius: 0,
    snapPoints: [200, 0],
    biggestSnapPoint: 200,
    contentHeight: 200,
    onClose: null,
  })

  const handleSideSheetOpen = React.useCallback(() => {
    toggleVisible(true)
  }, [])

  const handleSideSheetClose = React.useCallback(() => {
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
    <SideSheetContext.Provider value={[openBottomSheet, updateBottomSheet, closeBottomSheet]}>

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

        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View style={[styles.overlayContainer, styles.overlay]} />
        </TouchableWithoutFeedback>
      </ReAnimated.View>

      <SideSheet
        ref={sheetRef}
        snapPoints={bottomSheetConfig.snapPoints}
        borderRadius={bottomSheetConfig.borderRadius}
        enabledContentTapInteraction={false}
        callbackNode={fall}
        onOpenStart={handleSideSheetOpen}
        onCloseEnd={handleSideSheetClose}
        initialSnap={bottomSheetConfig.snapPoints.length - 1}
        renderContent={() => (
          <Container
            elevation={1}
            style={{
              height: '100%',
              width: bottomSheetConfig.biggestSnapPoint,
            }}>
            {bottomSheetConfig.renderContent()}
          </Container>
        )}
      />
    </SideSheetContext.Provider>
  )
}

export default SideSheetProvider
