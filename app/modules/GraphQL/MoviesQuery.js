import gql from 'graphql-tag'

export default gql`
  query movies($offset: Float!, $query: String, $noWatched: Boolean = true) {
    movies(limit: 25, offset: $offset, noWatched: $noWatched, query: $query) {
      _id
      __typename
      title
      genres
      synopsis
      type
      bookmarked
      download {
        downloadStatus
        downloading
        downloadComplete
      }
      rating {
        percentage
      }
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
          full
          high
        }
        poster {
          thumb
        }
      }
    }
  }
`
