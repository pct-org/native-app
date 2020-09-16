import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'

import i18n from 'modules/i18n'
import dimensions from 'modules/dimensions'
import { MostWatchedShowsQuery } from 'modules/GraphQL/ShowsQuery'

import CardSlider from 'components/CardSlider'

export const styles = StyleSheet.create({

  card: {
    width: dimensions.getWidth(145),
    height: dimensions.getHeight(210),
  },

})

export const MostWatchedShowsSlider = ({ onPress }) => {
  const { loading, data } = useQuery(
    MostWatchedShowsQuery,
  )

  return (
    <CardSlider
      onPress={onPress}
      title={i18n.t('Most Watched Shows')}
      items={!data || !data.shows ? [] : data.shows}
      loading={loading}
      cardStyle={styles.card}
      cardPosterSize={'medium'}
    />
  )
}

MostWatchedShowsSlider.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default MostWatchedShowsSlider
