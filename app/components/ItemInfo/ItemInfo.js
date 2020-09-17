import React from 'react'
import { View } from 'react-native'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import useCorrect from 'modules/useCorrect'

import Typography from 'components/Typography'
import Card from 'components/Card'

const infoContainerWidth = useCorrect(
  dimensions.SCREEN_WIDTH - dimensions.CARD_WIDTH - (dimensions.UNIT * 5),
  null,
  dimensions.CARD_WIDTH * 3
)

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

  container: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT,
    width: infoContainerWidth,
  },

  synopsis: {
    marginTop: dimensions.UNIT / 2,
    maxWidth: infoContainerWidth,
  },

  playIconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quality: {
    marginTop: dimensions.UNIT,
  },
}

export const ItemInfo = ({ item, quality, status, style, truncateSynopsis, empty, pointerEvents }) => (
  <View style={[styles.root, style]} pointerEvents={pointerEvents}>
    <Card
      pressable={false}
      overlayAllowed={false}
      elevation={0}
      empty={empty}
      item={
        item?.type === constants.TYPE_EPISODE
          ? item?.show
          : item
      }
    />

    <View style={styles.container}>
      <Typography
        emphasis={'high'}
        color={'white'}
        variant={'subtitle2'}
        textProps={{
          numberOfLines: 2,
          ellipsizeMode: 'tail',
        }}>
        {
          item?.type === constants.TYPE_EPISODE
            ? item?.show?.title
            : item?.title
        }
      </Typography>

      {item?.type === constants.TYPE_EPISODE && (
        <Typography
          emphasis={'high'}
          color={'white'}
          variant={'overline'}>
          {`S${item?.season}E${item?.number}. ${item?.title}`}
        </Typography>
      )}

      <Typography
        style={styles.synopsis}
        emphasis={'medium'}
        color={'white'}
        variant={'caption'}
        textProps={
          truncateSynopsis
            ? {
              numberOfLines: 5,
              ellipsizeMode: 'tail',
            }
            : {}}>
        {item?.synopsis}
      </Typography>

      {quality && (
        <Typography
          fontWeight={'medium'}
          emphasis={'high'}
          variant={'captionSmall'}
          style={styles.quality}>
          {
            status === constants.STATUS_DOWNLOADING
              ? i18n.t('Downloading in {{quality}}', { quality })
              : i18n.t('Downloaded in {{quality}}', { quality })
          }
        </Typography>
      )}
    </View>
  </View>
)

ItemInfo.defaultProps = {
  onPress: null,
  empty: false,
  quality: null,
  pointerEvents: null,
}

export default ItemInfo
