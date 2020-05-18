import gql from "graphql-tag"

export default gql`
  query bookmarks($offset: Float!, $query: String) {
    bookmarks(limit: 25, offset: $offset, query: $query) {
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
