import gql from 'graphql-tag'

export default gql`
query bookmarks($offset: Float!) {
  bookmarks(limit: 25, offset: $offset) {
    _id
    title
    images {
      poster {
        thumb
      }
    }
  }
}
`
