import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import colors from 'modules/colors'

export const styles = StyleSheet.create({

  root: {
    position: 'relative',
    backgroundColor: colors.BACKGROUND,
    zIndex: 2,
  },

  elevationRoot: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },

  elevation0: {
    opacity: 0,
  },

  elevation1: {
    opacity: 0.05,
  },

  elevation2: {
    opacity: 0.07,
  },

  elevation3: {
    opacity: 0.08,
  },

  elevation4: {
    opacity: 0.09,
  },

  elevation6: {},

  elevation8: {},

  elevation12: {},

  elevation16: {},

  elevation24: {},
})

export const Container = ({ children, elevation, style }) => (
  <View
    style={[styles.root, style]}
    elevation={elevation}
    pointerEvents={'box-none'}>
    {elevation > 0 && (
      <View
        style={[
          styles.elevationRoot,
          styles[`elevation${elevation}`],
        ]}
        pointerEvents={'none'} />
    )}

    {children}
  </View>
)

Container.propTypes = {
  children: PropTypes.node,
  elevation: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

Container.defaultProps = {
  children: null,
  elevation: 0,
  component: View,
  style: null,
}

export default Container
