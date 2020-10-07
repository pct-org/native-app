import React, { useState } from 'react'
import { View } from 'react-native'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import constants from 'modules/constants'
import useAsyncStorage from 'modules/useAsyncStorage'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Typography from 'components/Typography'
import BaseButton from 'components/BaseButton'
import SubSelector from 'mobile/components/SubSelector'

import { POSSIBLE_SUBS } from './SubtitlesConstants'

export const styles = {

  root: {
    paddingTop: dimensions.UNIT * 2,
  },

  title: {
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
    marginBottom: dimensions.UNIT / 2,
  },

  container: {
    paddingTop: dimensions.UNIT,
    paddingBottom: dimensions.UNIT,
    flexDirection: 'row',
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: dimensions.UNIT,
  },

  textContainer: {
    display: 'flex',
    alignContent: 'center',
    marginTop: dimensions.UNIT,
  },

}

export const Subtitles = () => {
  const [showSubSelector, toggleSubSelector] = useState(false)
  const [defaultSubtitleCode, updateStorageItem] = useAsyncStorage(constants.KEY_DEFAULT_SUBTITLE)

  const defaultSubtitle = POSSIBLE_SUBS.find(possibleSub => possibleSub.code === defaultSubtitleCode)

  return (
    <Container style={styles.root}>

      <SubSelector
        onRequestClose={() => toggleSubSelector(false)}
        onSubSelect={(code) => updateStorageItem(code)}
        visible={showSubSelector}
        subtitles={POSSIBLE_SUBS}
      />

      <Typography
        style={styles.title}
        variant={'headline6'}>
        {i18n.t('Subtitles')}
      </Typography>

      <BaseButton
        onPress={() => toggleSubSelector(true)}
        rippleBorderless={false}>
        <Container
          style={styles.container}
          elevation={2}>

          <View style={styles.iconContainer}>
            <Icon name={'subtitles'} />
          </View>

          <View style={styles.textContainer}>
            <Typography variant={'subtitle2'}>
              {
                i18n.t(
                  'Default subtitle: {{subtitle}}',
                  {
                    subtitle: defaultSubtitle?.language
                  },
                )
              }
            </Typography>
          </View>
        </Container>

      </BaseButton>

    </Container>
  )
}

Subtitles.propTypes = {}

Subtitles.defaultProps = {}

export default Subtitles
