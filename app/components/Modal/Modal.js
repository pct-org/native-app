import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Modal as RnModal, StyleSheet, StatusBar } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import IconButton from '../IconButton'

const styles = StyleSheet.create({

  root: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  listContainer: {
    opacity: 0.90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
    zIndex: 1100,
  },

  closeIcon: {
    position: 'absolute',
    bottom: dimensions.UNIT * 2,
    right: (dimensions.SCREEN_WIDTH / 2) - 20,
    zIndex: 1001,
  },

})

export const Modal = ({ children, visible, onRequestClose }) => {
  useEffect(() => {
    // Update the status bar visibility
    StatusBar.setHidden(visible)

  }, [visible])

  return (
    <RnModal
      transparent
      visible={visible}
      animationType={'fade'}
      onRequestClose={onRequestClose}
      hardwareAccelerated>
      <View style={[styles.root]}>

        <View style={[styles.root, styles.listContainer]}>
          <View style={styles.closeIcon}>
            <IconButton
              onPress={onRequestClose}
              name={'close'}
              color={colors.ICON_COLOR}
              size={40}
            />
          </View>

          {children}
        </View>

      </View>
    </RnModal>
  )
}

Modal.propTypes = {
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
}

Modal.defaultProps = {
  onRequestClose: null,
  visible: false,
}


export default Modal
