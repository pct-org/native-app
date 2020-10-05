import { gql } from '@apollo/client'

export const movieFragment = gql`
  fragment movie on Movie {
    _id
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
      type
    }
    searchedTorrents {
      quality
      sizeString
      type
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
`

export const showFragment = gql`
  fragment show on Show {
    _id
    title
    genres
    synopsis
    type
    bookmarked
    images {
      backdrop {
        high
      }
      poster {
        thumb
      }
    }
    seasons {
      _id
      title
      number
      images {
        poster {
          thumb
        }
      }
      episodes {
        _id
        title
        number
        synopsis
        images {
          poster {
            thumb
          }
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
      }
    }
  }
`
