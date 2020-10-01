import gql from 'graphql-tag'

export const movieMinimalFragment = gql`
  fragment movieMinimal on Movie {
    _id
    __typename
    title
    type
    watched {
      complete
      progress
    }
    images {
      poster {
        thumb
      }
    }
  }
`

export default gql`
  fragment movie on Movie {
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
`
