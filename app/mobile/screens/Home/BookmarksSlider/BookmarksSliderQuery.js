import gql from 'graphql-tag'

export const BookmarkedSubscription = gql`
  subscription onBookmarked {
    bookmarked {
      _id
      title
      type
      bookmarked
      images {
        poster {
          thumb
        }
      }
    }
  }
`

export default gql`
  query bookmarks($offset: Float!) {
    bookmarks(limit: 25, offset: $offset) {
      _id
      title
      type
      bookmarked
      images {
        poster {
          thumb
        }
      }
    }
  }
`
