import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import useCorrect from 'modules/useCorrect'

import BaseButton from '../BaseButton'
import Overlay from '../Overlay'
import Image from '../Image'
import Container from '../Container'

export const styles = StyleSheet.create({

  root: {
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
    margin: useCorrect(dimensions.UNIT, null, dimensions.UNIT / 2),
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

  'full-width': {
    height: dimensions.getHeight(180),
    width: dimensions.SCREEN_WIDTH,
    margin: 0,
    borderRadius: 0,
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
  overlayWithAnimation,
  overlayAllowed,
  children,
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

        {(item?.watched?.complete || forceOverlay) && overlayAllowed && (
          <Overlay
            withAnimation={overlayWithAnimation}
            variant={overlayVariant} />
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
  forceOverlay: false,
  overlayAllowed: true,
  overlayVariant: 'dark',
  overlayWithAnimation: false,
  hide: false,
}

export default Card
