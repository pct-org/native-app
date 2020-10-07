import { gql } from '@apollo/client'

export const movieBookmarkFragment = gql`
  fragment movieBookmark on Movie {
    ... on Movie {
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

export const movieMinimalFragment = gql`
  fragment movieMinimal on Movie {
    _id
    title
    type
    bookmarked
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
