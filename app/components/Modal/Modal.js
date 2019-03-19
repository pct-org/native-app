import React from 'react'
import PropTypes from 'prop-types'
import { View, Modal as RnModal, StyleSheet, StatusBar } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import IconButton from '../IconButton'

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
    opacity        : 0.90,
    display        : 'flex',
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: colors.BACKGROUND,
    zIndex         : 1100,
  },

  closeIcon: {
    position: 'absolute',
    top     : dimensions.UNIT * 2,
    right   : dimensions.UNIT * 2,
    zIndex  : 1001,
  },

})

export default class Modal extends React.Component {

  static propTypes = {
    onRequestClose: PropTypes.func,
    visible       : PropTypes.bool,
  }

  static defaultProps = {
    onRequestClose: null,
    visible       : false,
  }

  render() {
    const { children, visible, onRequestClose } = this.props

    return (
      <RnModal
        transparent
        visible={visible}
        animationType={'fade'}
        onRequestClose={onRequestClose}>
        <View style={[styles.root]}>

          <View style={[styles.root, styles.listContainer]}>
            <StatusBar hidden />

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

}
