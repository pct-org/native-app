import gql from 'graphql-tag'

export const DownloadQuery = gql`  
  query download($_id: String!) {
    download(_id: $_id) {
      _id
      type
      itemType
      torrentType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      subtitles {
        language
        code
      }
      __typename
    }
  }
`

export const StartStreamMutation = gql`
  mutation StartStream($_id: String!, $itemType: String!, $quality: String!, $torrentType: String) {
    download: startStream(_id: $_id, itemType: $itemType, quality: $quality, torrentType: $torrentType) {
      _id
      type
      itemType
      torrentType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      __typename
    }
  }
`

export const StopStreamMutation = gql`
  mutation StopStream($_id: String!) {
    download: stopStream(_id: $_id) {
      _id
      type
      itemType
      torrentType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      __typename
    }
  }
`

export const StartDownloadMutation = gql`
  mutation startDownload($_id: String!, $itemType: String!, $quality: String!, $torrentType: String) {
    download: startDownload(_id: $_id, itemType: $itemType, quality: $quality, torrentType: $torrentType) {
      _id
      type
      itemType
      torrentType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      __typename
    }
  }
`

export const RemoveDownloadMutation = gql`
  mutation removeDownload($_id: String!) {
    download: removeDownload(_id: $_id) {
      _id
      type
      itemType
      torrentType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      __typename
    }
  }
`
