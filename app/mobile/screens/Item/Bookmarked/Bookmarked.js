import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'

import IconButton from 'components/IconButton'
import { AddBookmarkMutation, RemoveBookmarkMutation } from 'modules/GraphQL/BookmarkedGraphQL'

export const Bookmarked = ({ _id, type, bookmarked, style }) => {
  const options = {
    variables: {
      _id,
      type,
    },
  }

  const [addBookmark] = useMutation(
    AddBookmarkMutation,
    options,
  )

  const [removeBookmark] = useMutation(
    RemoveBookmarkMutation,
    options,
  )

  const showBookmarkChangeAlert = bookmarked => () => {
    // TODO:: Show nice snackbar

  }

  const handleToggleBookmarked = () => {
    if (bookmarked) {
      removeBookmark().then(showBookmarkChangeAlert(false))

    } else {
      addBookmark().then(showBookmarkChangeAlert(true))
    }
  }

  return (
    <IconButton
      animatable={{
        animation: 'fadeIn',
        useNativeDriver: true,
        duration: constants.ANIMATION_DURATIONS.enteringScreen
      }}
      style={style}
      onPress={handleToggleBookmarked}
      emphasis={bookmarked
        ? 'high'
        : 'medium'
      }
      name={bookmarked
        ? 'playlist-check'
        : 'playlist-plus'
      }
      color={'primary'}
      size={dimensions.ICON_SIZE_MEDIUM} />
  )
}

Bookmarked.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['show', 'movie']).isRequired,
  bookmarked: PropTypes.bool.isRequired,
}

Bookmarked.defaultProps = {}

export default Bookmarked
