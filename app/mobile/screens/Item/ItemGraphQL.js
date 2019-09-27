import gql from 'graphql-tag'

export const MovieQuery = gql`
  query movie($_id: String!) {
    item: movie(_id: $_id) {
      _id
      __typename
      title
      genres
      synopsis
      type
      bookmarked
      downloaded
      downloading
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
          high
        }
        poster {
          thumb
        }
      }
    }
  }
`

export const ShowQuery = gql`
  query show($_id: String!) {
    item: show(_id: $_id) {
      _id
      title
      genres
      synopsis
      type
      bookmarked
      rating {
        percentage
      }
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
        type
        images {
          poster {
            thumb
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
          downloaded
          downloading
          watched {
            complete
            progress
          }
          images {
            poster {
              thumb
            }
          }
          torrents {
            quality
            sizeString
          }
        }
      }
    }
  }
`
