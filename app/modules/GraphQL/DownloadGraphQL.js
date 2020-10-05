import { gql } from '@apollo/client'

import downloadFragment from './fragments/downloadFragment'

export const DownloadsQuery = gql`
  query downloads($limit: Float!) {
    downloads(limit: $limit) {
      ...download
    }
  }

  ${downloadFragment}
`

export const DownloadQuery = gql`
  query download($_id: String!) {
    download(_id: $_id) {
      ...download
    }
  }

  ${downloadFragment}
`

export const StartStreamMutation = gql`
  mutation StartStream($_id: String!, $itemType: String!, $quality: String!, $torrentType: String) {
    download: startStream(_id: $_id, itemType: $itemType, quality: $quality, torrentType: $torrentType) {
      ...download
    }
  }

  ${downloadFragment}
`

export const StopStreamMutation = gql`
  mutation StopStream($_id: String!) {
    download: stopStream(_id: $_id) {
      ...download
    }
  }

  ${downloadFragment}
`

export const StartDownloadMutation = gql`
  mutation startDownload($_id: String!, $itemType: String!, $quality: String!, $torrentType: String) {
    download: startDownload(_id: $_id, itemType: $itemType, quality: $quality, torrentType: $torrentType) {
      ...download
    }
  }

  ${downloadFragment}
`

export const RemoveDownloadMutation = gql`
  mutation removeDownload($_id: String!) {
    download: removeDownload(_id: $_id) {
      ...download
    }
  }

  ${downloadFragment}
`
