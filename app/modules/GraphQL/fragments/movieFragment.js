import { gql } from '@apollo/client'

import torrentFragment from 'modules/GraphQL/fragments/torrentFragment'

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
      ...torrent
    }
    searchedTorrents {
      ...torrent
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
  
  ${torrentFragment}
`
