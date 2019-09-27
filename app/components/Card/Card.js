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
    height: dimensions.CARD_HEIGHT,
    width: dimensions.CARD_WIDTH,
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
    margin: dimensions.UNIT,
  },

})

export const Card = ({ item, variant, empty, style, ...rest }) => (
  <Container
    elevation={1}
    style={[styles.root, style]}>
    <BaseButton
      // onLongPress={() => console.warn(item.title)}
      // onPress={() => console.log('press')}
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

        {item && item.watched && item.watched.complete && (
          <Overlay variant={'dark'} />
        )}
      </View>
    </BaseButton>
  </Container>
)

Card.propTypes = {
  item: PropTypes.object,
  empty: PropTypes.bool,
  variant: PropTypes.oneOf([
    'default',
    'medium',
    'small',
  ]),
  style: PropTypes.object,
}

Card.defaultProps = {
  item: null,
  empty: false,
  variant: 'default',
  style: null,
  component: BaseButton,
}

export default Card
