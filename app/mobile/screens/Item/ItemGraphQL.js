import { gql } from '@apollo/client'

import torrentFragment from 'modules/GraphQL/fragments/torrentFragment'

export const MovieQuery = gql`
  query movie($_id: String!) {
    movie(_id: $_id) {
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
        ...torrent
      }
      searchedTorrents {
        ...torrent
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
  
  ${torrentFragment}
`

export const ShowQuery = gql`
  query show($_id: String!) {
    show(_id: $_id)  {
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
            ...torrent
          }
          searchedTorrents {
            ...torrent
          }
        }
      }
    }
  }
  
  ${torrentFragment}
`
