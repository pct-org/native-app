import { gql } from '@apollo/client'

import { movieBookmarkFragment } from './fragments/movieFragment'
import { showBookmarkFragment } from './fragments/showFragment'

export const AddBookmarkMutation = gql`
  mutation AddBookmark($_id: String!, $type: String!) {
    toggleBookmark: addBookmark(_id: $_id, type: $type) {
      ...movieBookmark

      ...showBookmark
    }
  }

  ${movieBookmarkFragment}
  ${showBookmarkFragment}
`

export const RemoveBookmarkMutation = gql`
  mutation RemoveBookmark($_id: String!, $type: String!) {
    toggleBookmark: removeBookmark(_id: $_id, type: $type) {
      ...movieBookmark

      ...showBookmark
    }
  }

  ${movieBookmarkFragment}
  ${showBookmarkFragment}
`

export const BookmarkedSubscription = gql`
  subscription onBookmarked {
    bookmarked {
      ...movieBookmark

      ...showBookmark
    }
  }

  ${movieBookmarkFragment}
  ${showBookmarkFragment}
`

export const BookmarksModeQuery = gql`
  query bookmarks($offset: Float!, $query: String, $filter: String) {
    bookmarks(limit: 25, offset: $offset, query: $query, filter: $filter) {
      ...movieBookmark

      ...showBookmark
    }
  }

  ${movieBookmarkFragment}
  ${showBookmarkFragment}
`

export default gql`
  query bookmarks($offset: Float!) {
    bookmarks(limit: 25, offset: $offset) {
      ...movieBookmark
      
      ...showBookmark
    }
  }

  ${movieBookmarkFragment}
  ${showBookmarkFragment}
`
