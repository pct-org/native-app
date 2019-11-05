import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Platform } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'

import BaseButton from '../BaseButton'
import Overlay from '../Overlay'
import Image from '../Image'
import Container from '../Container'

import BaseCard, { styles as baseStyles } from './Card'

export const styles = StyleSheet.create({

  root: {
    ...baseStyles.root,

    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: dimensions.BORDER_RADIUS,
  },

  card: {
    margin: 0,
    overflow: 'visible',
  },

  active: {
    borderColor: colors.PRIMARY_COLOR_200,
  },
})

export const Card = React.memo(({
  style,
  isTvSelected,
  variant,
  ...rest
}) => (
  <View style={[
    styles.root,
    baseStyles[variant],
    isTvSelected
      ? styles.active
      : {},
  ]}>
    <BaseCard
      {...rest}
      variant={variant}
      style={{
        ...baseStyles[variant],
        ...styles.card,
        ...style,
      }}
    />
  </View>
))

Card.propTypes = {
  ...BaseCard.propTypes,
}

Card.defaultProps = {
  ...BaseCard.defaultProps,
}

export default Card
