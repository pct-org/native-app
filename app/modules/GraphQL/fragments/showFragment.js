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

export const showFragment = gql`
  fragment show on Show {
    _id
    title
    genres
    synopsis
    type
    bookmarked
    trailer
    rating {
      percentage
    }
    images {
      backdrop {
        high
      }
      poster {
        thumb
        high
      }
    }
  }
`
