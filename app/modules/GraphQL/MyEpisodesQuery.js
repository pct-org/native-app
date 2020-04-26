import gql from 'graphql-tag'

export default gql`
  query episodes {
    episodes: myEpisodes{
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
      torrents {
        quality
        sizeString
      }
    }
  }
`
