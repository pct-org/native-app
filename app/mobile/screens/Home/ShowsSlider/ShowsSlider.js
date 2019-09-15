import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import CardSlider from 'components/CardSlider'

import ShowsSliderQuery from './ShowsSliderQuery'

export const ShowsSlider = ({ styles, handleGoTo, handleItemOpen }) => {
  const { loading, data, fetchMore } = useQuery(
    ShowsSliderQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  return (
    <CardSlider
      style={styles.section}
      handleItemOpen={handleItemOpen}
      title={i18n.t('Shows')}
      items={!data || !data.shows ? [] : data.shows}
      goToMore={handleGoTo('Shows')}
      loading={loading}
      onEndReached={fetchMoreUpdateQuery('shows', data, fetchMore)}
    />

  )
}

ShowsSlider.propTypes = {
  styles: PropTypes.object.isRequired,
  handleGoTo: PropTypes.func.isRequired,
  handleItemOpen: PropTypes.func.isRequired,
}

export default ShowsSlider
