import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList } from 'react-native'

import dimensions from 'modules/dimensions'

import Typography from 'components/Typography'
import MyEpisode from 'components/MyEpisode'

export const styles = StyleSheet.create({

  root: {},

  titleContainer: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT * 2,
  },

  container: {
    marginBottom: dimensions.UNIT * 2,
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

})

export const MyEpisodesSlider = ({ title, items }) => {
  const renderEpisode = ({ item }) => (
    <MyEpisode
      empty={!item}
      item={item}
    />
  )

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Typography variant={'headline6'}>
          {title}
        </Typography>
      </View>

      <FlatList
        scrollEnabled={items.length > 0}
        horizontal
        removeClippedSubviews
        contentContainerStyle={styles.container}
        data={items.length === 0 ? Array(2).fill() : items}
        initialNumToRender={4}
        windowSize={5}
        renderItem={renderEpisode}
        ListFooterComponent={() => <View style={{ width: dimensions.UNIT * 4 }} />}
        keyExtractor={(item, index) => item
          ? `${item._id}-${index}`
          : `${index}`
        }
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

MyEpisodesSlider.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default MyEpisodesSlider
