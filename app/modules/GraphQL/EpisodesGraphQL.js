import { gql } from '@apollo/client'

import torrentFragment from 'modules/GraphQL/fragments/torrentFragment'

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
        ...torrent
      }
      searchedTorrents {
        ...torrent
      }
    }
  }
  
  ${torrentFragment}
`
