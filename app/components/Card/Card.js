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

})

export const Card = ({ item, empty, style, ...rest }) => (
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
  style: PropTypes.object,
}

Card.defaultProps = {
  item: null,
  empty: false,
  style: null,
  component: BaseButton,
}

export default Card
