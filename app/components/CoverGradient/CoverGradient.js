import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from 'modules/colors'

const styles = StyleSheet.create({

  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

})

export const CoverGradient = ({ start, end }) => (
  <LinearGradient
    start={start}
    end={end}
    colors={['transparent', colors.BACKGROUND]}
    locations={[0, 1]}
    style={styles.linearGradient} />
)

CoverGradient.propTypes = {
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),

  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
}

CoverGradient.defaultProps = {
  start: {
    x: 0,
    y: 0.1,
  },

  end: {
    x: 0,
    y: 1,
  },
}

export default CoverGradient
