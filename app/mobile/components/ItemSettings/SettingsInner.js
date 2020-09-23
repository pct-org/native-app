import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import BaseButton from 'components/BaseButton'
import Icon from 'components/Icon'
import * as Animatable from 'react-native-animatable'

export const styles = StyleSheet.create({

  root: {
    marginVertical: 7,
    paddingHorizontal: dimensions.UNIT * 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: dimensions.UNIT,
  },

  labels: {},

  label: {
    // flex: 1,
  },

})

export const SettingsItem = ({ label, subLabel, style, icon, disabled, onPress, loading }) => {
  return (
    <>
      {loading && (
        <Animatable.View
          style={styles.icon}
          animation={'fadeIn'}
          duration={constants.ANIMATION_DURATIONS.enteringScreen}
          useNativeDriver>
          <ActivityIndicator
            size={18}
            color={colors.PRIMARY_COLOR_200} />
        </Animatable.View>
      )}
      {icon && !loading && (
        <Icon
          color={'primary'}
          style={styles.icon}
          size={18}
          name={icon}
          emphasis={
            disabled
              ? 'low'
              : 'high'
          } />
      )}

      <View style={styles.labels}>
        <Typography
          emphasis={
            disabled
              ? 'low'
              : 'high'
          }
          style={styles.label}
          variant={'overline'}>
          {label}
        </Typography>

        {subLabel && (
          <Typography
            emphasis={
              disabled
                ? 'low'
                : 'medium'
            }
            variant={'captionSmall'}>
            {subLabel}
          </Typography>
        )}
      </View>
    </>
  )
}

export default SettingsItem
