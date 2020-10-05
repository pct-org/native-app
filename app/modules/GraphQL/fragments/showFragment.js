import { gql } from '@apollo/client'

export const showBookmarkFragment = gql`
  fragment showBookmark on Show {
    ... on Show {
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

export const showMinimalFragment = gql`
  fragment showMinimal on Show {
    _id
    title
    type
    bookmarked
    images {
      poster {
        thumb
        medium
      }
    }
  }
`

export default gql`
  fragment show on Show {
    _id
    title
    type
    bookmarked
    images {
      poster {
        thumb
        full
      }
      backdrop {
        full
      }
    }
    seasons {
      _id
      images {
        poster {
          thumb
          full
        }
      }
      episodes {
        _id
        title
        number
        season
        synopsis
        firstAired
        type
        show {
          title
          images {
            poster {
              thumb
              high
            }
          }
        }
        watched {
          complete
          progress
        }
        download {
          downloadStatus
          downloading
          downloadComplete
          downloadQuality
        }
        images {
          poster {
            thumb
          }
        }
      }
    }
  }
`
