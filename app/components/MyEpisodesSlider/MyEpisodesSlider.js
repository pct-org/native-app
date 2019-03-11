import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import Typography from 'components/Typography'
import MyEpisode from 'components/MyEpisode'

import dimensions from 'modules/dimensions'

export const styles = StyleSheet.create({

  title: {
    marginLeft  : dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT / 2,
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  container: {
    marginLeft: dimensions.UNIT * 2,
  },

})

export const MyEpisodesSlider = ({ loading, title, items, onPress, style }) => {
  const renderEpisode = ({ item }) => (
    <MyEpisode
      empty={!item}
      item={item}
      onPress={() => onPress(item)}
    />
  )

  return (
    <View style={style}>
      <Typography
        style={styles.title}
        variant={'display6'}
        fontWeight={'medium'}>
        {title}
      </Typography>

      <FlatList
        horizontal
        removeClippedSubviews
        contentContainerStyle={styles.container}
        data={items.length === 0 ? Array(2).fill() : items}
        initialNumToRender={4}
        windowSize={5}
        renderItem={renderEpisode}
        ItemSeparatorComponent={() => <View style={{ width: dimensions.UNIT }} />}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 5 }} />}
        keyExtractor={(item, index) => item ? `${item.id}` : `${index}`}
        showsHorizontalScrollIndicator={false}
        snapToInterval={dimensions.MY_EPISODE_CARD_WIDTH + dimensions.UNIT}
        snapToAlignment={
          items.length > 2
            ? 'center'
            : 'end'
        }
      />
    </View>
  )
}

export default MyEpisodesSlider
