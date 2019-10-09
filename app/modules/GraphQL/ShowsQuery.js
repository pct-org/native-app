import gql from 'graphql-tag'

export default gql`
  query shows($offset: Float!) {
    shows(limit: 25, offset: $offset) {
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
