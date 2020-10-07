import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import i18n from 'modules/i18n'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'
import ShowsQuery from 'modules/GraphQL/ShowsGraphQL'

import CardSlider from 'components/CardSlider'

export const ShowsSlider = ({ handleGoTo, onPress }) => {
  const { loading, data, fetchMore } = useQuery(
    ShowsQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  return (
    <CardSlider
      onPress={onPress}
      title={i18n.t('Shows')}
      items={!data || !data.shows ? [] : data.shows.filter((show) => !show.bookmarked)}
      goToMore={handleGoTo('Shows')}
      loading={loading}
      onEndReached={fetchMoreUpdateQuery('shows', data, fetchMore)}
    />
  )
}

ShowsSlider.propTypes = {
  handleGoTo: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ShowsSlider
