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

  const [sideSheetConfig, setSideSheetConfig] = React.useState({
    renderContent: () => null,
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

    if (sideSheetConfig.onClose) {
      sideSheetConfig.onClose()
    }
  }, [sideSheetConfig.onClose])

  const handleRenderContent = React.useCallback(() => (
    <Container
      elevation={1}
      style={{
        height: '100%',
        width: sideSheetConfig.biggestSnapPoint,
      }}>
      {visible && sideSheetConfig.renderContent()}
    </Container>
  ), [visible, sideSheetConfig.biggestSnapPoint, sideSheetConfig.renderContent])

  useBackButton(() => {
    if (visible && sheetRef.current) {
      closeSideSheet()

      return true
    }

    return false
  })

  const updateSideSheet = (config, force = false) => {
    if (visible || force) {
      setSideSheetConfig({
        ...sideSheetConfig,
        ...config,
      })
    }
  }

  const openSideSheet = (config) => {
    updateSideSheet(config, true)

    // if we are already visible it can be content changes
    if (!visible) {
      sheetRef.current.snapTo(0)
    }
  }

  const closeSideSheet = () => {
    sheetRef.current.snapTo(sideSheetConfig.snapPoints.length - 1)
  }

  return (
    <SideSheetContext.Provider value={[openSideSheet, updateSideSheet, closeSideSheet]}>

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

        <TouchableWithoutFeedback onPress={closeSideSheet}>
          <View style={[styles.overlayContainer, styles.overlay]} />
        </TouchableWithoutFeedback>
      </ReAnimated.View>

      <SideSheet
        ref={sheetRef}
        snapPoints={sideSheetConfig.snapPoints}
        borderRadius={sideSheetConfig.borderRadius}
        enabledContentTapInteraction={false}
        callbackNode={fall}
        onOpenStart={handleSideSheetOpen}
        onCloseEnd={handleSideSheetClose}
        initialSnap={sideSheetConfig.snapPoints.length - 1}
        renderContent={handleRenderContent}
      />
    </SideSheetContext.Provider>
  )
}

export default SideSheetProvider
