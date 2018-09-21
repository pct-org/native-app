import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight, ScrollView, Text } from 'react-native'

import Card from '../Card'
import Typography from '../Typography'

const styles = StyleSheet.create({

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
    marginLeft: 10,
    marginTop : 10,
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

})

export default class CardList extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,

    loading: PropTypes.bool.isRequired,
  }

  render() {
    const { loading, title, items, onPress, style } = this.props

    return (
      <View style={style}>
        <Typography
          style={styles.title}
          variant={'title'}>
          {title}
        </Typography>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items.map(item => (
            <Card
              key={item.id}
              item={item}
              onPress={() => onPress(item)}
            />
          ))}

          {!loading && items.length === 0 && (
            <React.Fragment>
              <Card empty />
              <Card empty />
              <Card empty />
            </React.Fragment>
          )}
        </ScrollView>

      </View>
    )
  }

}
