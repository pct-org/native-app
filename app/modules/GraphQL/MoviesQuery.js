import gql from 'graphql-tag'

export const MoviesModeQuery = gql`
  query movies($offset: Float!, $query: String) {
    movies(limit: 25, offset: $offset, query: $query) {
      _id
      __typename
      title
      type
      watched {
        complete
      }
      images {
        poster {
          thumb
        }
      }
    }
  }
`

export default gql`
  query movies($offset: Float!, $query: String) {
    movies(limit: 25, offset: $offset, query: $query) {
      _id
      __typename
      title
      genres
      synopsis
      type
      bookmarked
      trailer
      download {
        downloadStatus
        downloading
        downloadComplete
        downloadQuality
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
        type
      }
      searchedTorrents {
        quality
        sizeString
        type
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
