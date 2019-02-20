import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { material } from 'react-native-typography'

import BaseButton from 'components/BaseButton'
import IconButton from 'components/IconButton'

import colors from 'modules/colors'
import i18n from 'modules/i18n'
import sortAB from 'modules/utils/sortAB'

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

  container: {
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
  },

  sub: {
    ...material.titleWhiteObject,
    margin: 8,
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

        {subs && (
          <View style={[styles.root, styles.container]}>
            <View style={styles.closeIcon}>
              <IconButton
                onPress={cancel}
                name={'close'}
                color={'#FFF'}
                size={40}
              />
            </View>

            {subs.sort(sortAB('title')).map((sub) => (
              <BaseButton
                key={sub.language}
                onPress={() => selectSub(sub)}>
                <Text style={styles.sub}>
                  {sub.title}
                </Text>
              </BaseButton>
            ))}

            <BaseButton onPress={() => selectSub(null)}>
              <Text style={styles.sub}>
                {i18n.t('None')}
              </Text>
            </BaseButton>
          </View>
        )}

      </Animatable.View>
    )
  }

}
