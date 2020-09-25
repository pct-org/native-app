import LottieView from 'lottie-react-native'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

import dimensions from 'modules/dimensions'
import colors from 'modules/colors'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import Icon from 'components/Icon'

export const styles = StyleSheet.create({

  icon: {
    marginRight: dimensions.UNIT,
  },

  labels: {
    flex: 1,
  },

  label: {},

  subLabels: {
    flexDirection: 'row',
  },

})

export const SettingsItem = ({ label, subLabel, subLabelLine2, icon, disabled, loading, downloading }) => {
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

      {downloading && (
        <Animatable.View
          style={styles.icon}
          animation={'fadeIn'}
          duration={constants.ANIMATION_DURATIONS.enteringScreen}
          useNativeDriver>
          <LottieView
            style={{
              width: 18,
              height: 18,
            }}
            source={require('assets/lottie/cloud-download.json')}
            autoPlay
            loop />
        </Animatable.View>
      )}

      {icon && !loading && !downloading && (
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

        {(subLabel || subLabelLine2) && (
          <View style={styles.subLabels}>
            {subLabel && (
              <Typography
                style={{
                  flex: 1,
                }}
                emphasis={
                  disabled
                    ? 'low'
                    : 'medium'
                }
                variant={'captionSmall'}>
                {subLabel}
              </Typography>
            )}

            {subLabelLine2 && (
              <Typography
                emphasis={
                  disabled
                    ? 'low'
                    : 'medium'
                }
                variant={'captionSmall'}>
                {subLabelLine2}
              </Typography>
            )}
          </View>
        )}
      </View>
    </>
  )
}

export default SettingsItem
