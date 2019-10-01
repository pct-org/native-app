import gql from 'graphql-tag'

export const DownloadQuery = gql`
  query download($_id: String!) {
    download(_id: $_id) {
      _id
      type
      itemType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
    }
  }
`

export const StartStreamMutation = gql`
  mutation StartStream($_id: String!, $itemType: String!, $quality: String!) {
    download: startStream(_id: $_id, itemType: $itemType, quality: $quality) {
      _id
      type
      itemType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
    }
  }
`

export const StopStreamMutation = gql`
  mutation StopStream($_id: String!) {
    download: stopStream(_id: $_id)
  }
`
