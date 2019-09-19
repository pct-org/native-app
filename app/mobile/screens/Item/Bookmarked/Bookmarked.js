import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import IconButton from 'components/IconButton'

import { AddBookmarkMutation, RemoveBookmarkMutation } from './BookmarkedGraphQL'

export const Bookmarked = ({ _id, type, bookmarked, Query, styles }) => {
  const options = {
    variables: {
      _id,
      type,
    },
  }

  const [AddBookmark] = useMutation(
    AddBookmarkMutation,
    options,
  )

  const [RemoveBookmark] = useMutation(
    RemoveBookmarkMutation,
    options,
  )

  const handleToggleBookmarked = () => {
    if (bookmarked) {
      RemoveBookmark()

    } else {
      AddBookmark()
    }
  }

  return (
    <IconButton
      animatable={{
        animation: 'fadeIn',
        useNativeDriver: true,
      }}
      style={styles.icon}
      onPress={handleToggleBookmarked}
      name={bookmarked
        ? 'check'
        : 'plus'
      }
      color={colors.ICON_COLOR}
      size={dimensions.ITEM_ICONS}>
      {i18n.t('My List')}
    </IconButton>
  )
}
Bookmarked.propTypes = {}

Bookmarked.defaultProps = {}

export default Bookmarked
