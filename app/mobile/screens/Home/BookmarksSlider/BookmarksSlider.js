import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import i18n from 'modules/i18n'
import fetchMoreUpdateQuery from 'modules/GraphQL/helpers/fetchMoreUpdateQuery'

import CardSlider from 'components/CardSlider'

import BookmarksSliderQuery from './BookmarksSliderQuery'

export const BookmarksSlider = ({ styles, handleGoTo, onPress }) => {
  const { loading, data, fetchMore } = useQuery(
    BookmarksSliderQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  return (
    <CardSlider
      style={styles.section}
      onPress={onPress}
      title={i18n.t('My List')}
      items={!data || !data.bookmarks ? [] : data.bookmarks}
      goToMore={handleGoTo('MyList')}
      loading={loading}
      onEndReached={fetchMoreUpdateQuery('bookmarks', data, fetchMore)}
    />

  )
}

BookmarksSlider.propTypes = {
  styles: PropTypes.object.isRequired,
  handleGoTo: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default BookmarksSlider
