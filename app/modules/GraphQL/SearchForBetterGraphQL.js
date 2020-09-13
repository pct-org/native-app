import gql from 'graphql-tag'

export const SearchForBetterEpisode = gql`
  mutation SearchForBetterEpisode($_id: String!) {
    getBetterQualitiesForEpisode(_id: $_id) {
      _id
      __typename
      
      searchedTorrents {
        quality
        sizeString
      }
    }
  }
`

export const SearchForBetterMovie = gql`
  mutation SearchForBetterMovie($_id: String!) {
    getBetterQualitiesForMovie(_id: $_id) {
      _id
      __typename

      searchedTorrents {
        quality
        sizeString
      }
    }
  }
`
