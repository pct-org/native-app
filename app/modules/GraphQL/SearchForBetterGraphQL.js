import { gql } from '@apollo/client'

import torrentFragment from 'modules/GraphQL/fragments/torrentFragment'

export const SearchForBetterEpisode = gql`
  mutation SearchForBetterEpisode($_id: String!) {
    getBetterQualitiesForEpisode(_id: $_id) {
      _id
      searchedTorrents {
        ...torrent
      }
    }
  }
  
  ${torrentFragment}
`

export const SearchForBetterMovie = gql`
  mutation SearchForBetterMovie($_id: String!) {
    getBetterQualitiesForMovie(_id: $_id) {
      _id
      searchedTorrents {
        ...torrent
      }
    }
  }
  
  ${torrentFragment}
`
