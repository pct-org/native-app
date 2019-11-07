import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'

import BaseButton from '../BaseButton'
import Overlay from '../Overlay'
import Image from '../Image'
import Container from '../Container'

export const styles = StyleSheet.create({

  root: {
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
    margin: dimensions.UNIT,
    height: dimensions.CARD_HEIGHT,
    width: dimensions.CARD_WIDTH,
  },

  small: {
    height: dimensions.CARD_HEIGHT_SMALL,
    width: dimensions.CARD_WIDTH_SMALL,
    margin: dimensions.UNIT / 2,
  },

  big: {
    height: dimensions.CARD_HEIGHT_BIG,
    width: dimensions.CARD_WIDTH_BIG,
    margin: dimensions.UNIT / 2,
  },

})

export const Card = ({
  item,
  variant,
  elevation,
  empty,
  style,
  forceOverlay,
  overlayVariant,
  ...rest
}) => (
  <Container
    elevation={elevation}
    style={[
      styles.root,
      variant === 'small' && styles.small,
      style,
    ]}>
    <BaseButton
      {...rest}>
      <View>
        <Image
          type={'poster'}
          size={'thumb'}
          images={
            empty
              ? {}
              : item.images
          } />

        {((item && item.watched && item.watched.complete) || forceOverlay) && (
          <Overlay variant={overlayVariant} />
        )}
      </View>
    </BaseButton>
  </Container>
)

Card.propTypes = {
  item: PropTypes.object,
  empty: PropTypes.bool,
  style: PropTypes.object,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'small', 'big']),
  hide: PropTypes.bool,
  overlayVariant: PropTypes.string,
}

Card.defaultProps = {
  item: null,
  empty: false,
  style: null,
  component: BaseButton,
  elevation: 1,
  variant: 'default',
  overlayVariant: 'dark',
  hide: false,
}

export default Card
