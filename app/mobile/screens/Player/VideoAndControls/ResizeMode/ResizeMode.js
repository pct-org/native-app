import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import IconButton from 'components/IconButton'

export const ResizeMode = ({ activeMode, changeResizeMode, toggleControls }) => {
  const getNextMode = () => {
    if (activeMode === 'contain') {
      return 'cover'

    } else if (activeMode === 'cover') {
      return 'stretch'
    }

    return 'contain'
  }

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2000,
        width: dimensions.ICON_SIZE_MEDIUM + dimensions.UNIT,
        right: dimensions.UNIT * 5,
        bottom: dimensions.UNIT * 2,
      }}
      pointerEvents={'box-none'}>

      <IconButton
        style={{
          transform: [{ rotate: '90deg' }],
        }}
        onPress={() => {
          // Also toggle the controls so they stay visible
          toggleControls()

          changeResizeMode(getNextMode())
        }}
        name={'cellphone-screenshot'}
        color={'primary'}
        size={dimensions.ICON_SIZE_DEFAULT}>
        {activeMode}
      </IconButton>

    </View>
  )
}

ResizeMode.propTypes = {
  activeMode: PropTypes.string.isRequired,
  changeResizeMode: PropTypes.func.isRequired,
}

export default ResizeMode
