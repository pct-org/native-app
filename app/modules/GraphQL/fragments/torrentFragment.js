import gql from 'graphql-tag'

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
