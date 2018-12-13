import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native'

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

export const CardSlider = ({ loading, title, items, onPress, style, cardProps }) => (
  <View style={style}>
    <Typography
      style={styles.title}
      variant={'title'}>
      {title}
    </Typography>

    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}>
      {items.map(item => (
        <Card
          variant={'small'}
          key={item.id}
          item={item}
          onPress={() => onPress(item)}
          {...cardProps}
        />
      ))}

      {(loading || items.length === 0) && (
        <React.Fragment>
          <Card variant={'small'} empty {...cardProps} />
          <Card variant={'small'} empty {...cardProps} />
          <Card variant={'small'} empty {...cardProps} />
        </React.Fragment>
      )}
    </ScrollView>

  </View>
)

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
