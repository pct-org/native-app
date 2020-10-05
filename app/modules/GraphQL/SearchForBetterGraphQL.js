import { gql } from '@apollo/client'

export const SearchForBetterEpisode = gql`
  mutation SearchForBetterEpisode($_id: String!) {
    getBetterQualitiesForEpisode(_id: $_id) {
      _id
      searchedTorrents {
        quality
        sizeString
        type
      }
    }
  }
`

export const SearchForBetterMovie = gql`
  mutation SearchForBetterMovie($_id: String!) {
    getBetterQualitiesForMovie(_id: $_id) {
      _id
      searchedTorrents {
        quality
        sizeString
        type
      }
    }
  }
`
