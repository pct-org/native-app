import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'

import BaseButton from 'components/BaseButton'
import IconButton from 'components/IconButton'

import colors from 'modules/colors'
import i18n from 'modules/i18n'

const styles = StyleSheet.create({

  root: {
    flex    : 1,
    position: 'absolute',
    top     : 0,
    left    : 0,
    width   : '100%',
    height  : '100%',
    zIndex  : 1100,
  },

  listContainer: {
    opacity        : 0.9,
    display        : 'flex',
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: colors.BACKGROUND,
    zIndex         : 1100,
  },

  closeIcon: {
    position: 'absolute',
    top     : 34,
    right   : 14,
    zIndex  : 1001,
  },

  subsContainer: {
    width: '100%',
  },

  sub: {
    ...material.titleWhiteObject,
    margin   : 8,
    textAlign: 'center',
    zIndex   : 1000,
  },

  clearSub: {
    marginBottom: 60,
  },

})

export default class SubSelector extends React.Component {

  state = {
    hidden: false,
    subs  : null,
  }

  handleAnimationEnd = () => {
    const { show } = this.props

    this.setState({
      hidden: !show,
    })
  }

  handleAnimationBegin = () => {
    this.setState({
      hidden: false,
    })
  }

  renderSub = ({ item: sub, index }) => {
    const { selectSub } = this.props

    return (
      <BaseButton onPress={() => selectSub(sub, index)}>
        <Text style={styles.sub}>
          {sub.title}
        </Text>
      </BaseButton>
    )
  }

  render() {
    const { show, cancel, subs, selectSub } = this.props
    const { hidden } = this.state

    if (hidden && !show) {
      return null
    }

    return (
      <Animatable.View
        animation={show ? 'fadeIn' : 'fadeOut'}
        duration={200}
        style={[styles.root]}
        onAnimationBegin={this.handleAnimationBegin}
        onAnimationEnd={this.handleAnimationEnd}
        useNativeDriver>

        {subs &&  (
          <View style={[styles.root, styles.listContainer]}>
            <View style={styles.closeIcon}>
              <IconButton
                onPress={cancel}
                name={'close'}
                color={'#FFF'}
                size={40}
              />
            </View>

            <FlatList
              removeClippedSubviews
              style={styles.subsContainer}
              data={subs}
              numColumns={1}
              initialNumToRender={12}
              windowSize={32}
              renderItem={this.renderSub}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${item.language}-${index}`}
              ListHeaderComponent={() => <View style={{ marginBottom: 100 }} />}
              ListFooterComponent={() => (
                <View style={styles.clearSub}>
                  <BaseButton onPress={() => selectSub(null, null)}>
                    <Text style={styles.sub}>
                      {i18n.t('None')}
                    </Text>
                  </BaseButton>
                </View>
              )}
            />

          </View>
        )}

      </Animatable.View>
    )
  }

}
