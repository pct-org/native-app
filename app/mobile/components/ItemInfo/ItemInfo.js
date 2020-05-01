import React from 'react'
import { View } from 'react-native'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Typography from 'components/Typography'
import Card from 'components/Card'
import QualitySelector from 'mobile/components/QualitySelector'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

  container: {
    marginTop: dimensions.UNIT,
    marginLeft: dimensions.UNIT,
    width: dimensions.SCREEN_WIDTH - dimensions.CARD_WIDTH - (dimensions.UNIT * 5),
  },

  synopsis: {
    marginTop: dimensions.UNIT / 2,
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

export const ItemInfo = ({ item, quality, status, variant, onPress, style, truncateSynopsis, empty }) => {
  return (
    <View style={[styles.root, style]}>
      {variant === 'default' && (
        <Card
          elevation={0}
          empty={empty}
          item={
            item?.type === constants.TYPE_EPISODE
              ? item?.show
              : item
          }
        />
      )}

      {variant === 'playable' && (
        <Card
          elevation={0}
          empty={empty}
          item={
            item?.type === constants.TYPE_EPISODE
              ? item?.show
              : item
          }
          onPress={onPress}
          overlayVariant={'default'}
          forceOverlay>
          {!empty && (
            <View style={styles.playIconContainer}>
              <QualitySelector
                variant={'downloads'}
                // visible={showQualitySelector}
                item={item}
                // onRequestClose={() => toggleSelecting(false)}
              />
            </View>
          )}
        </Card>
      )}

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
            item?.type === 'episode'
              ? item?.show?.title
              : item?.title
          }
        </Typography>

        {item?.type === 'episode' && (
          <Typography
            emphasis={'high'}
            color={'white'}
            variant={'overline'}>
            {`${item?.number}. ${item?.title}`}
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
}

ItemInfo.defaultProps = {
  onPress: null,
  empty: false,
  variant: 'default',
  quality: null,
}

export default ItemInfo
