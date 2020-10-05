import { gql } from '@apollo/client'

export default gql`
  query episodes {
    episodes: myEpisodes {
      _id
      title
      number
      season
      type
      show {
        title
        images {
          backdrop {
            thumb
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
        type
      }
      searchedTorrents {
        quality
        sizeString
        type
      }
    }
  }
`
