import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Typography from 'components/Typography'
import MyEpisode from 'components/MyEpisode'
import TextButton from 'components/TextButton'
import Overlay from 'components/Overlay'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

export const styles = StyleSheet.create({

  titleContainer: {
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    marginBottom  : 0,
    marginRight   : dimensions.UNIT,
    marginLeft    : dimensions.UNIT * 2,
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  container: {
    marginLeft: dimensions.UNIT * 2,
  },

  moreButton: {
    padding: dimensions.UNIT / 2,
  },

  refreshingContainer: {
    position: 'absolute',
    left    : 0,
    right   : 0,
    width   : '100%',
    height  : '100%',
    display : 'flex',

    flexDirection : 'row',
    justifyContent: 'center',
    alignItems    : 'center',
  },

  refreshingIndicator: {
    marginRight: dimensions.UNIT,
  },

})

export const MyEpisodesSlider = ({ loading, title, items, onPress, style, onRefresh, refreshing }) => {
  const renderEpisode = ({ item }) => (
    <MyEpisode
      empty={!item}
      item={item}
      onPress={() => onPress(item)}
    />
  )

  return (
    <View style={style}>
      <View style={styles.titleContainer}>
        <Typography
          style={styles.title}
          variant={'title'}
          fontWeight={'medium'}>
          {title}
        </Typography>

        <TextButton
          style={styles.moreButton}
          upperCase={false}
          emphasis={'medium'}
          fontWeight={'regular'}
          onPress={onRefresh}>
          {i18n.t('refresh')}
        </TextButton>
      </View>


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
        // snapToInterval={dimensions.MY_EPISODE_CARD_WIDTH + dimensions.UNIT}
        // snapToAlignment={
        //   items.length > 2
        //     ? 'left'
        //     : 'end'
        // }
      />

      <Animatable.View
        animation={refreshing ? 'fadeIn' : 'fadeOut'}
        duration={loading ? 0 : 300}
        pointerEvents={'none'}
        useNativeDriver
        style={styles.refreshingContainer}>
        <Overlay style={{ opacity: 0.8 }} />

        <ActivityIndicator
          style={styles.refreshingIndicator}
          size={20} />

        <Typography
          variant={'title'}>
          {i18n.t('Refreshing')}
        </Typography>
      </Animatable.View>
    </View>
  )
}

MyEpisodesSlider.propTypes = {
  onRefresh: PropTypes.func.isRequired,
}

export default MyEpisodesSlider
