import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

import i18n from 'modules/i18n'
import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import TextButton from 'components/TextButton'

import SeasonsAndEpisodes from './SeasonsAndEpisodes'

export const styles = StyleSheet.create({

  buttonContainer: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },

  buttons: {
    marginRight: dimensions.UNIT,
    paddingLeft: dimensions.UNIT * 2,
    paddingRight: dimensions.UNIT * 2,
    paddingTop: dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
    marginLeft: dimensions.UNIT * 2,
  },

  buttonActive: {
    borderTopWidth: 4,
    borderTopColor: colors.ITEM_ACTIVE_TAB_INDICATOR,
  },

})

export const ItemOrRecommendations = ({ item }) => (
  <Animatable.View
    animation={'fadeIn'}
    useNativeDriver>
    <View style={styles.buttonContainer}>
      <TextButton
        onPress={() => {}}
        emphasis={'high'}
        style={[styles.buttons, styles.buttonActive]}>
        {i18n.t('Episodes')}
      </TextButton>

    </View>

    <SeasonsAndEpisodes
      item={item}
    />
  </Animatable.View>
)

export default ItemOrRecommendations
