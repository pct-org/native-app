import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'

import IconButton from 'components/IconButton'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: dimensions.getWidth(140),
    height: '100%',
    justifyContent: 'center',
  },

  icon: {
    marginBottom: dimensions.UNIT * 1.5
  }

})

export const Menu = ({ children, style }) => (
  <View style={style}>
    {children}

    <View style={styles.root}>
      <IconButton
        name={'home'}
        color={'primary'}
        emphasis={'medium'}
        size={24}
        style={styles.icon}
        onFocus={() => console.log('focus', 'home')}
        onBlur={() => console.log('blur', 'home')}
      />

      <IconButton
        name={'filmstrip'}
        color={'white'}
        emphasis={'medium'}
        size={24}
        style={styles.icon}
        onFocus={() => console.log('focus', 'movies')}
        onBlur={() => console.log('blur', 'movies')}
      />

      <IconButton
        name={'play-box-outline'}
        color={'white'}
        emphasis={'medium'}
        size={24}
        style={styles.icon}
        onFocus={() => console.log('focus', 'shows')}
        onBlur={() => console.log('blur', 'shows')}
      />

      <IconButton
        name={'plus'}
        color={'white'}
        emphasis={'medium'}
        size={24}
        style={styles.icon}
        onFocus={() => console.log('focus', 'my list')}
        onBlur={() => console.log('blur', 'my list')}
      />
    </View>
  </View>
)

Menu.propTypes = {}

Menu.defaultProps = {}

export default Menu
