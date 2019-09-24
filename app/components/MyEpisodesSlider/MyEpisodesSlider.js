import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Typography from 'components/Typography'
import TypographyStyles from 'components/Typography/Typography.styles'
import MyEpisode from 'components/MyEpisode'
import TextButton from 'components/TextButton'
import Overlay from 'components/Overlay'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

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

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  container: {
    marginLeft: dimensions.UNIT * 2,
  },

  moreButton: {
    padding: dimensions.UNIT / 2,
  },

  listContainer: {
    position: 'relative',
  },

  refreshingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  refreshingIndicator: {
    margin: dimensions.UNIT * 2,
  },

  noItems: {
    textAlign: 'center',
  },

})

export const MyEpisodesSlider = ({ loading, title, items, onPress, style, onRefresh, refreshing }) => {
  const [activeCard, setActiveCard] = useState(0)

  let flatlistRef = null

  const handleItemFocus = (index) => {
    let scrollTo = null
    if (activeCard < index && flatlistRef && index > 7) {
      scrollTo = (index + 1) - 7
    }

    if (scrollTo) {
      flatlistRef.scrollToIndex({
        index: scrollTo,
      })
    }

    setActiveCard(index)
  }

  const renderEpisode = ({ item, index }) => (
    <MyEpisode
      empty={!item}
      item={item}
      setActive={() => handleItemFocus(index)}
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

      <View style={styles.listContainer}>
        <FlatList
          scrollEnabled={items.length > 0}
          horizontal
          removeClippedSubviews
          ref={ref => flatlistRef = ref}
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
          animation={items.length === 0 || refreshing ? 'fadeIn' : 'fadeOut'}
          duration={loading ? 0 : 300}
          pointerEvents={'none'}
          useNativeDriver
          style={styles.refreshingContainer}>
          <Overlay style={{ opacity: 0.8 }} />

          {refreshing && (
            <React.Fragment>
              <ActivityIndicator
                style={styles.refreshingIndicator}
                size={20} />

              <Typography variant={'title'}>
                {i18n.t('Refreshing')}
              </Typography>
            </React.Fragment>
          )}

          {!refreshing && items.length === 0 && (
            <Typography
              style={styles.noItems}
              variant={'episodeTitle'}>
              {i18n.t('Episodes aired within the last 7 days from shows you follow will appear here')}
            </Typography>
          )}
        </Animatable.View>
      </View>
    </View>
  )
}

MyEpisodesSlider.propTypes = {
  onRefresh: PropTypes.func.isRequired,
}

export default MyEpisodesSlider
