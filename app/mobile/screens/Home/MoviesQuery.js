import gql from 'graphql-tag'

export default gql`
  query movies($offset: Float!) {
    movies(limit: 25, offset: $offset, noBookmarks: true, noWatched: true) {
      _id
      __typename
      title
      genres
      synopsis
      type
      images {
        backdrop {
          high
        }
        poster {
          thumb
        }
      }
    }
  }
`
