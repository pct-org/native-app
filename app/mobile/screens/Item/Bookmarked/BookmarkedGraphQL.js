import gql from 'graphql-tag'

export const AddBookmarkMutation = gql`
  mutation AddBookmark($_id: String!, $type: String!) {
    toggleBookmark: addBookmark(_id: $_id, type: $type) {
      _id
      type
      bookmarked
    }
  }
`

export const RemoveBookmarkMutation = gql`
  mutation RemoveBookmark($_id: String!, $type: String!) {
    toggleBookmark: removeBookmark(_id: $_id, type: $type) {
      _id
      type
      bookmarked
    }
  }
`
