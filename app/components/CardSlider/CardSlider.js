import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList } from 'react-native'

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

export const CardSlider = ({ title, items, onPress, style, onEndReached, goToMore, loading }) => {
  const renderCard = ({ item }) => {
    const empty = !item

    return (
      <Card
        variant={'medium'}
        empty={empty}
        item={item}
        onPress={() => {
          if (!empty && !loading) {
            onPress(item)
          }
        }}
      />
    )
  }

  return (
    <View style={style}>

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
        contentContainerStyle={styles.container}
        data={items.length === 0
          ? Array(4).fill()
          : items
        }
        initialNumToRender={4}
        windowSize={8}
        renderItem={renderCard}
        ItemSeparatorComponent={() => <View style={{ width: dimensions.UNIT }} />}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 5 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
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

  loading: PropTypes.bool,
}

CardSlider.defaultProps = {
  onEndReached: null,
  goToMore: null,

  loading: false,
}

export default CardSlider
