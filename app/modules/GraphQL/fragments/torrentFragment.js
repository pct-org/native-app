import { gql } from '@apollo/client'

export default gql`
  fragment torrent on Torrent {
    quality
    sizeString
    type
    peers
    seeds
    provider
  }
`
