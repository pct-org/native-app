import gql from 'graphql-tag'

export const DownloadQuery = gql`
  query download($_id: String!) {
    download(_id: $_id) {
      _id
      type
      progress
      status
    }
  }
`
export const StartStreamMutation = gql`
  mutation StartStream($_id: String!, $type: String!, $quality: String!) {
    download: startStream(_id: $_id, type: $type, quality: $quality) {
      _id
      type
      progress
      status
    }
  }
`
