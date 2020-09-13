import gql from 'graphql-tag'

export default gql`
  query episodes {
    episodes: myEpisodes {
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
          backdrop {
            full
          }
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
          full
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
`
