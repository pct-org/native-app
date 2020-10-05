import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import i18n from 'modules/i18n'
import BookmarksQuery, { BookmarkedSubscription } from 'modules/GraphQL/BookmarksGraphQL'

import CardSlider from 'components/CardSlider'

export const BookmarksSlider = ({ handleGoTo, onPress }) => {
  const { loading, data, subscribeToMore } = useQuery(
    BookmarksQuery,
    {
      variables: {
        offset: 0,
      },
    },
  )

  useEffect(() => {
    subscribeToMore({
      document: BookmarkedSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !subscriptionData.data.bookmarked) {
          return prev
        }

        // Get the updated bookmark
        const { bookmarked } = subscriptionData.data

        // Is the new bookmarked bookmarked
        if (bookmarked.bookmarked) {
          // Add the new bookmark
          return Object.assign({}, {
            bookmarks: [bookmarked, ...prev.bookmarks],
          })
        } else {
          // Remove the bookmark
          return Object.assign({}, {
            bookmarks: prev.bookmarks.filter(prevBookmark => prevBookmark._id !== bookmarked._id),
          })
        }
      },
    })

  }, [])

  if (!loading && (!data || !data.bookmarks || data.bookmarks.length === 0)) {
    return null
  }

  return (
    <CardSlider
      onPress={onPress}
      title={i18n.t('My List')}
      items={!data || !data.bookmarks ? [] : data.bookmarks}
      goToMore={handleGoTo('MyList')}
      loading={loading}
      // onEndReached={fetchMoreUpdateQuery('bookmarks', data, fetchMore)}
    />

  )
}

BookmarksSlider.propTypes = {
  handleGoTo: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default BookmarksSlider
