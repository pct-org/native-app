import { gql } from '@apollo/client'

import { showMinimalFragment } from './fragments/showFragment'

export const MostWatchedShowsQuery = gql`
  query mostWatchedShows {
    shows: mostWatchedShows {
      ...showMinimal
    }
  }

  ${showMinimalFragment}
`

export const ShowsModeQuery = gql`
  query shows($offset: Float!, $query: String, $sort: String) {
    shows(limit: 25, offset: $offset, query: $query, sort: $sort) {
      ...showMinimal
    }
  }

  ${showMinimalFragment}
`

export default gql`
  query shows($offset: Float!, $query: String) {
    shows(limit: 25, offset: $offset, query: $query) {
      ...showMinimal
    }
  }

  ${showMinimalFragment}
`
