import gql from 'graphql-tag'

export const DownloadedShows = gql`
  query shows($offset: Float!, $query: String) {
    shows(limit: 25, offset: $offset, query: $query, downloadsOnly: true) {
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
  }
`

export const MostWatchedShowsQuery= gql`
  query shows {
    shows: mostWatchedShows {
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
  }
`


export default gql`
  query shows($offset: Float!, $query: String) {
    shows(limit: 25, offset: $offset, query: $query) {
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

