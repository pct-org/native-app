import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList } from 'react-native'

import dimensions from 'modules/dimensions'

import Card from '../Card'
import Typography from '../Typography'
import Icon from '../Icon'
import BaseButton from '../BaseButton'

export const styles = StyleSheet.create({

  root: {},

  titleContainer: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT * 2,
    display: 'flex',
    flexDirection: 'row',
  },

  goToMoreIcon: {},

  container: {
    marginBottom: dimensions.UNIT * 2,
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

})

export const CardSlider = ({ title, items, onPress, onEndReached, goToMore, loading }) => {
  const renderCard = ({ item }) => {
    const empty = !item

    return (
      <Card
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
    <View style={styles.root}>

      {(title || goToMore) && (
        <BaseButton
          rippleColor={null}
          onPress={goToMore}>
          <View style={styles.titleContainer}>
            <Typography variant={'headline6'}>
              {title}
            </Typography>

            {goToMore && (
              <Icon
                style={styles.goToMoreIcon}
                color={'white'}
                name={'chevron-right'}
                size={dimensions.ICON_SIZE_DEFAULT}
              />
            )}
          </View>
        </BaseButton>
      )}

      <FlatList
        horizontal
        removeClippedSubviews
        scrollEnabled={items.length > 0}
        contentContainerStyle={styles.container}
        data={items.length === 0
          ? Array(4).fill()
          : items
        }
        initialNumToRender={4}
        windowSize={8}
        renderItem={renderCard}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 4 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        showsHorizontalScrollIndicator={false}
        onEndReached={
          items.length > 0
            ? onEndReached
            : null
        }
        onEndReachedThreshold={dimensions.CARD_WIDTH * 3}
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
