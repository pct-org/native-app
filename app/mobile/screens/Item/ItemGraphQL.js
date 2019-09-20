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
      watched {
        complete
        progress
      }
      torrents {
        quality
        url
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
          images {
            poster {
              thumb
            }
          }
          torrents {
            quality
          }
        }
      }
    }
  }
`
