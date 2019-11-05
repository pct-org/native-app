import gql from 'graphql-tag'

export const MoviesQuery = gql`
  query movies($offset: Float!, $query: String) {
    movies(limit: 25, offset: $offset, query: $query) {
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
          full
        }
        poster {
          thumb
        }
      }
    }
  }
`

export const ShowsQuery = gql`
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

export const BookmarksQuery = gql`
  query bookmarks($offset: Float!) {
    bookmarks(limit: 25, offset: $offset) {
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

