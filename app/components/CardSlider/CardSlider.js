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
// TODO:: Move to mobile/components
export const CardSlider = ({ title, items, onPress, onEndReached, goToMore, loading, style, cardStyle, cardPosterSize }) => {
  const renderCard = ({ item }) => {
    const empty = !item

    return (
      <Card
        empty={empty}
        item={item}
        style={cardStyle}
        posterSize={cardPosterSize}
        onPress={() => {
          if (!empty && !loading) {
            onPress(item)
          }
        }}
      />
    )
  }

  return (
    <View style={[styles.root, style]}>

      {(title || goToMore) && (
        <BaseButton
          rippleColor={'transparent'}
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
          ? Array(4).fill(null)
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
        onEndReached={onEndReached}
        onEndReachedThreshold={3}
      />

    </View>
  )
}

CardSlider.propTypes = {
  onEndReached: PropTypes.func,
  goToMore: PropTypes.func,

  loading: PropTypes.bool,
  style: PropTypes.object,
}

CardSlider.defaultProps = {
  onEndReached: null,
  goToMore: null,
  style: {},
  loading: false,
  cardPosterSize: undefined,
}

export default CardSlider
