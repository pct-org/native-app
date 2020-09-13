import gql from 'graphql-tag'

export const movieFragment = gql`
  fragment movie on Movie {
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
      url
    }
    searchedTorrents {
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
        }
        searchedTorrents {
          quality
          sizeString
        }
      }
    }
  }
`
