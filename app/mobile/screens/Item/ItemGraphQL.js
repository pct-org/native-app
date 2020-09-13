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
      trailer
      rating {
        percentage
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
      torrents {
        quality
        sizeString
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
          high
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
              high
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
  }
`
