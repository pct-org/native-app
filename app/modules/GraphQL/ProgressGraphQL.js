import gql from 'graphql-tag'

export const progrssMutation = gql`
  mutation($_id: String!, $type: String!, $progress: Float!) {
    
    progress(_id: $_id, type: $type, progress: $progress) {
      ... on Movie {
        _id
        watched {
          progress
          complete
        }
      }
      
      ... on Episode {
        _id
        watched {
          progress
          complete
        }
      }
    }
    
  }
`
