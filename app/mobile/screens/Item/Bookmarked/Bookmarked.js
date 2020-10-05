import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import constants from 'modules/constants'
import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'
import { AddBookmarkMutation, RemoveBookmarkMutation } from 'modules/GraphQL/BookmarksGraphQL'

import IconButton from 'components/IconButton'
import Snackbar from 'components/Snackbar'

export const Bookmarked = ({ _id, type, bookmarked, style }) => {
  const [snackbarInfo, setSnackbarInfo] = React.useState({
    visible: false,
    bookmarked: false,
  })

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

  const hideSnackbar = () => setSnackbarInfo((state) => ({
    ...state,
    visible: false,
  }))

  const showBookmarkChangeAlert = (bookmarked) => {
    setSnackbarInfo({
      visible: true,
      bookmarked,
    })
  }

  const handleToggleBookmarked = (withSnackbar) => () => {
    const action = bookmarked
      ? removeBookmark
      : addBookmark

    action().then(() => {
      if (withSnackbar) {
        showBookmarkChangeAlert(!bookmarked)
      }
    })
  }

  return (
    <React.Fragment>
      <IconButton
        animatable={{
          animation: 'fadeIn',
          useNativeDriver: true,
          duration: constants.ANIMATION_DURATIONS.enteringScreen,
        }}
        style={style}
        onPress={handleToggleBookmarked(true)}
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

      <Snackbar
        visible={snackbarInfo.visible}
        onDismiss={hideSnackbar}
        action={{
          label: i18n.t('undo'),
          onPress: handleToggleBookmarked(false),
        }}>
        {
          i18n.t(
            snackbarInfo.bookmarked
              ? 'Added to your list'
              : 'Removed from your list',
          )
        }
      </Snackbar>
    </React.Fragment>
  )
}

Bookmarked.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['show', 'movie']).isRequired,
  bookmarked: PropTypes.bool.isRequired,
}

Bookmarked.defaultProps = {}

export default Bookmarked
