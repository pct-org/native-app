import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useMutation } from '@apollo/client'

import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import i18n from 'modules/i18n'
import colors from 'modules/colors'
import { SearchForBetterEpisode, SearchForBetterMovie } from 'modules/GraphQL/SearchForBetterGraphQL'

import Typography from 'components/Typography'
import TextButton from 'components/TextButton'
import Quality from './Quality'

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: (dimensions.SCREEN_HEIGHT / 2) + dimensions.UNIT,
    display: 'flex',
    alignItems: 'center',
  },

  qualitiesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: dimensions.UNIT,
  },

  searchedTitle: {
    marginTop: dimensions.UNIT * 3,
  },

  loader: {
    marginTop: dimensions.UNIT * 4,
  },

  searchButtonContainer: {
    position: 'absolute',
    bottom: dimensions.UNIT * 10,
  },

})

export const Qualities = ({ variant, item, handleQualityPress }) => {
  const [searchForBetter, { loading }] = useMutation(
    item.type === 'episode'
      ? SearchForBetterEpisode
      : SearchForBetterMovie,
    {
      variables: {
        _id: item._id,
      },
    },
  )

  return (
    <React.Fragment>
      <Animatable.View
        animation={'fadeIn'}
        duration={200}
        style={styles.container}
        useNativeDriver>
        <Typography variant={'subtitle1'}>
          {i18n.t(variant === constants.TYPE_STREAM
            ? 'Watch in'
            : 'Download in',
          )}
        </Typography>

        <View style={styles.qualitiesContainer}>
          {item && item.torrents && item.torrents.map((torrent) => (
            <Quality
              key={torrent.quality}
              handleQualityPress={handleQualityPress}
              torrent={torrent}
            />
          ))}
        </View>

        {loading && (
          <ActivityIndicator
            size={40}
            style={styles.loader}
            color={colors.PRIMARY_COLOR_200} />
        )}

        {!loading && item && item.searchedTorrents && item.searchedTorrents.length > 0 && (
          <React.Fragment>
            <Typography
              style={styles.searchedTitle}
              variant={'subtitle1'}>
              {i18n.t('Searched qualities')}
            </Typography>

            <View style={styles.qualitiesContainer}>
              {item && item.searchedTorrents && item.searchedTorrents.map((torrent) => (
                <Quality
                  key={torrent.quality}
                  handleQualityPress={handleQualityPress}
                  torrent={torrent}
                />
              ))}
            </View>
          </React.Fragment>
        )}
      </Animatable.View>

      <Animatable.View
        animation={
          loading
            ? 'fadeOut'
            : 'fadeIn'
        }
        style={styles.searchButtonContainer}
        pointerEvents={'box-none'}
        duration={200}
        useNativeDriver>
        <TextButton
          onPress={searchForBetter}
          component={TouchableNativeFeedback}
          color={'primary'}>
          Search for better
        </TextButton>
      </Animatable.View>
    </React.Fragment>
  )
}

Qualities.propTypes = {
  item: PropTypes.object.isRequired,
  variant: PropTypes.oneOf([
    constants.TYPE_STREAM,
    constants.TYPE_DOWNLOAD,
  ]),
  handleQualityPress: PropTypes.func.isRequired,
}

export default Qualities
