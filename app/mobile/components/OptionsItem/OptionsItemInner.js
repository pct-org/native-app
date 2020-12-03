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

  labelsContainer: {
    flex: 1,
  },

  labels: {
    flexDirection: 'row',
  },

})

export const SettingsItem = ({ label, labelLine2, subLabel, subLabelLine2, icon, disabled, loading, downloading }) => {
  return (
    <>
      {loading && (
        <Animatable.View
          style={styles.icon}
          animation={'fadeIn'}
          duration={constants.ANIMATION_DURATIONS.enteringScreen}
          useNativeDriver>
          <ActivityIndicator
            size={dimensions.ICON_SIZE_SMALL}
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
              width: dimensions.ICON_SIZE_SMALL,
              height: dimensions.ICON_SIZE_SMALL
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
          size={dimensions.ICON_SIZE_SMALL}
          name={icon}
          emphasis={
            disabled
              ? 'low'
              : 'high'
          } />
      )}

      <View style={styles.labelsContainer}>
        {(label || subLabel) && (
          <View style={styles.labels}>
            <Typography
              style={{
                flex: 1,
              }}
              emphasis={
                disabled
                  ? 'low'
                  : 'high'
              }
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
        )}

        {(labelLine2 || subLabelLine2) && (
          <View style={styles.labels}>
            {labelLine2 && (
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
                {labelLine2}
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
