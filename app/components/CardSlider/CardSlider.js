import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList, Platform } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import Card from '../Card'
import Typography from '../Typography'
import TextButton from '../TextButton'

export const styles = StyleSheet.create({

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    marginRight: dimensions.UNIT,
    marginLeft: dimensions.UNIT * 2,
  },

  moreButton: {
    padding: dimensions.UNIT / 2,
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  container: {
    marginLeft: dimensions.UNIT * 2,
  },

})

export const CardSlider = ({ loading, title, items, onPress, style, onEndReached, goToMore }) => {
  const [activeCard, setActiveCard] = useState(0)

  let flatListRef = null

  const handleItemFocus = (index) => {
    let scrollTo = null
    if (activeCard < index && flatListRef && index > 3) {
      scrollTo = (index + 1) - 4

    } else if (activeCard > index && flatListRef) {
      if (index >= 3) {
        scrollTo = (index - 1) - 2
      }
    }

    if (scrollTo) {
      flatListRef.scrollToIndex({
        index: scrollTo,
      })
    }

    setActiveCard(index)
  }

  const renderCard = ({ item, index }) => (
    <Card
      variant={'medium'}
      empty={!item}
      item={item}
      onPress={() => onPress(item)}
      setActive={() => handleItemFocus(index)}
    />
  )

  return (
    <View style={style} pointerEvents={'none'}>

      {(title || goToMore) && (
        <View style={styles.titleContainer}>
          <Typography
            variant={'title'}
            fontWeight={'medium'}>
            {title}
          </Typography>

          {goToMore && (
            <TextButton
              style={styles.moreButton}
              upperCase={false}
              emphasis={'medium'}
              fontWeight={'regular'}
              onPress={goToMore}>
              {i18n.t('more')}
            </TextButton>
          )}
        </View>
      )}

      <FlatList
        horizontal
        removeClippedSubviews
        ref={ref => flatListRef = ref}
        contentContainerStyle={styles.container}
        data={items.length === 0 ? Array((Platform.isTV ? 11 : 4)).fill() : items}
        initialNumToRender={Platform.isTV ? 11 : 4}
        windowSize={Platform.isTV ? 11 : 4}
        renderItem={renderCard}
        ItemSeparatorComponent={() => <View style={{ width: dimensions.UNIT }} />}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 5 }} />}
        keyExtractor={(item, index) => item ? `${item.id}-${index}` : `${index}`}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={dimensions.CARD_MEDIUM_WIDTH * 3}
      />

    </View>
  )
}

CardSlider.propTypes = {
  onEndReached: PropTypes.func,
  goToMore: PropTypes.func,
}

CardSlider.defaultProps = {
  onEndReached: null,
  goToMore: null,
  innerRef: null,
}

export default CardSlider
