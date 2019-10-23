import gql from 'graphql-tag'

export default gql`
  query shows($offset: Float!, $query: String) {
    shows(limit: 25, offset: $offset, query: $query) {
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
