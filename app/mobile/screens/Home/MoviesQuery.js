import gql from 'graphql-tag'

export default gql`
  query movies($offset: Float!) {
    movies(limit: 25, offset: $offset, noWatched: true) {
      _id
      __typename
      title
      genres
      synopsis
      type
      bookmarked
      watched {
        complete
        progress
      }
      torrents {
        quality
        sizeString
      }
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
