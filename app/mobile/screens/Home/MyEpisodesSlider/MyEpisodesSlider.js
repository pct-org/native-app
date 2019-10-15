import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import EpisodesSlider from 'components/MyEpisodesSlider'

import MyEpisodesSliderQuery from './MyEpisodesSliderQuery'

export const MyEpisodesSlider = () => {
  const { loading, data, fetchMore } = useQuery(
    MyEpisodesSliderQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  return (
    <EpisodesSlider
      title={i18n.t('My Episodes')}
      items={!data || !data.episodes ? [] : data.episodes.filter(episode => !episode.watched.complete)}
      loading={loading}
      // onEndReached={fetchMoreUpdateQuery('episodes', data, fetchMore)}
    />
  )
}

MyEpisodesSlider.propTypes = {}

export default MyEpisodesSlider
