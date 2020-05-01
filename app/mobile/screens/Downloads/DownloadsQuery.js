import gql from 'graphql-tag'

export const DownloadsQuery = gql`
  query downloads($offset: Float!) {
    downloads(limit: 25, offset: $offset) {
      _id
      __typename
      quality
      status
      movie {
        _id
        title
        synopsis
        type
        download{
          downloadQuality
          downloadStatus
          downloading
        }
        images {
          poster {
            thumb
            high
          }
        }
      }
      episode {
        _id
        title
        number
        synopsis
        type
        download{ 
          downloadQuality
          downloadStatus
          downloading
        }
        show {
          title
          images {
            poster {
              thumb
              high
            }
          }
        }
      }
    }
  }
`
