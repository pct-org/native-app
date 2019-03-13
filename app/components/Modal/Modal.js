import React from 'react'
import PropTypes from 'prop-types'
import { View, Modal as RnModal, StyleSheet } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import StatusBarController from 'modules/StatusBarController'

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

  handleShow = () => {
    StatusBarController.update('rgba(0, 0, 0, 0.90)')
  }

  handleRequestClose = () => {
    const { onRequestClose } = this.props

    StatusBarController.update(StatusBarController.previousActiveBackgroundColor)

    if (onRequestClose) {
      onRequestClose()
    }
  }

  render() {
    const { children, visible } = this.props

    return (
      <RnModal
        transparent
        visible={visible}
        animationType={'fade'}
        onShow={this.handleShow}
        onRequestClose={this.handleRequestClose}>
        <View style={[styles.root]}>

          <View style={[styles.root, styles.listContainer]}>
            <View style={styles.closeIcon}>
              <IconButton
                onPress={this.handleRequestClose}
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
