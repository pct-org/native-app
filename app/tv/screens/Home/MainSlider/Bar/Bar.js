import React from 'react'
import { TouchableHighlight, View } from 'react-native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import BaseButton from 'components/BaseButton'

export const styles = {

  barContainer: {
    flex: 1,
    position: 'relative',
    height: dimensions.getHeight(12),
    marginLeft: dimensions.getWidth(10),
    marginRight: dimensions.getWidth(10),
    borderRadius: dimensions.BORDER_RADIUS / 3,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },

  bar: {
    height: dimensions.getHeight(8),
    backgroundColor: colors.BACKGROUND_LIGHT,
    borderRadius: dimensions.BORDER_RADIUS / 3,
    opacity: 0.3,
    width: '100%',
  },

  button: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: dimensions.getHeight(12),
  },

  activeBar: {
    backgroundColor: colors.BACKGROUND_LIGHT,
    borderRadius: dimensions.BORDER_RADIUS / 2.5,
    height: dimensions.getHeight(12),
    width: '100%',
    // marginLeft: dimensions.getWidth(10),
    // marginRight: dimensions.getWidth(10),
  },

}

export const Bar = ({ focusManager, index, amount, setActive, onFocus }) => {
  const [focused, toggleFocus] = React.useState(false)
  const getFocusId = React.useCallback((index) => {
    return `home-bar-${index}`
  })

  React.useEffect(() => {
    if (index === 0) {
      handleFocus(null, false)
    }
  }, [])

  const handleFocus = React.useCallback((event, withOnFocusCall = true) => {
    if (withOnFocusCall) {
      console.log('on focus callback')
      onFocus()
    }

    toggleFocus(true)
    setActive()

    focusManager.updateCurrentItem(
      focusManager.constants.HOME,
      getFocusId(index),
      {
        // container: focusManager.constants.HOME_HEADER,
        // containerTop: null,
        // containerBottom: focusManager.constants.HOME_MAIN_COVER_PLAY,
        // element: focusId,
        elementLeft: getFocusId(index === 0 ? amount - 1 : index - 1),
        elementRight: getFocusId(index === amount - 1 ? 0 : index + 1),
      },
    )
  })

  return (
    <View style={styles.barContainer}>
      <View style={styles.bar} />

      <BaseButton
        hasTVPreferredFocus={index === 0}
        innerRef={(ref) => focusManager.addRef(getFocusId(index), ref)}
        component={TouchableHighlight}
        style={styles.button}
        onBlur={() => {
          toggleFocus(false)
        }}
        onFocus={handleFocus}>
        <View style={{
          ...styles.activeBar,
          opacity: focused
            ? 1
            : 0,
        }} />
      </BaseButton>
    </View>
  )
}

export default React.memo(Bar)
