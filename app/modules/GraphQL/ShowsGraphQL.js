import { gql } from '@apollo/client'

import showFragment, { showMinimalFragment } from './fragments/showFragment'

export const DownloadedShows = gql`
  query shows($offset: Float!, $query: String) {
    shows(limit: 25, offset: $offset, query: $query, downloadsOnly: true) {
      ...show
    }
  }

  ${showFragment}
`

export const MostWatchedShowsQuery = gql`
  query mostWatchedShows {
    shows: mostWatchedShows {
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
