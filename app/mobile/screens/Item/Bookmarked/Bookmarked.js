import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useMutation } from '@apollo/react-hooks'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

import IconButton from 'components/IconButton'

import { AddBookmarkMutation, RemoveBookmarkMutation } from './BookmarkedGraphQL'

const styles = StyleSheet.create({

  icon: {
    minWidth: 80,
    textAlign: 'center',
    marginLeft: dimensions.UNIT,
  },

})

export const Bookmarked = ({ _id, type, bookmarked }) => {
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
      color={bookmarked
        ? colors.ICON_ACTIVE
        : colors.ICON_COLOR
      }
      size={dimensions.ITEM_ICONS}>
      {i18n.t('My List')}
    </IconButton>
  )
}

Bookmarked.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['show', 'movie']).isRequired,
  bookmarked: PropTypes.bool.isRequired,
}

Bookmarked.defaultProps = {}

export default Bookmarked
