import gql from 'graphql-tag'

export default gql`
query shows($offset: Float!) {
  shows(limit: 25, offset: $offset, noBookmarks: true) {
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
