import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'

import Card from '../Card'
import Typography from '../Typography'

export const styles = StyleSheet.create({

  root: {
    height     : 190,
    width      : 120,
    marginLeft : 10,
    marginRight: 10,
    alignSelf  : 'stretch',
    position   : 'relative',
    display    : 'flex',
    alignItems : 'center',
  },

  title: {
    marginLeft: 8,
    marginTop : 8,
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  scrollView: {
    margin: 4,
  },
})

export const CardSlider = ({ loading, title, items, onPress, style, cardProps }) => {
  const renderCard = ({ item }) => (
    <Card
      variant={'small'}
      empty={!item}
      item={item}
      onPress={() => onPress(item)}
      {...cardProps}
    />
  )

  return (
    <View style={style}>
      <Typography
        style={styles.title}
        variant={'title'}
        fontWeight={'bold'}>
        {title}
      </Typography>

      <FlatList
        horizontal
        removeClippedSubviews
        style={styles.scrollView}
        data={items.length === 0 ? Array(4).fill() : items}
        initialNumToRender={4}
        windowSize={8}
        renderItem={renderCard}
        keyExtractor={(item, index) => item ? item.id : `${index}`}
        showsHorizontalScrollIndicator={false}
      />

    </View>
  )
}

CardSlider.propTypes = {
  title    : PropTypes.string.isRequired,
  items    : PropTypes.array.isRequired,
  onPress  : PropTypes.func.isRequired,
  loading  : PropTypes.bool.isRequired,
  style    : PropTypes.object,
  cardProps: PropTypes.object,
}

CardSlider.defaultProps = {
  style    : null,
  cardProps: {},
}

export default CardSlider
