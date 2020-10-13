import { gql } from '@apollo/client'

import movieFragment, { movieMinimalFragment } from './fragments/movieFragment'

export const MoviesModeQuery = gql`
  query movies($offset: Float!, $query: String, $sort: String!) {
    movies(limit: 25, offset: $offset, query: $query, sort: $sort) {
      ...movieMinimal
    }
  }

  ${movieMinimalFragment}
`

export const RelatedMoviesQuery = gql`
  query relatedMovies($_id: String!) {
    movies: relatedMovies(_id: $_id) {
      ...movieMinimal
    }
  }

  ${movieMinimalFragment}
`

export default gql`
  query movies($offset: Float!, $query: String) {
    movies(limit: 25, offset: $offset, query: $query) {
      ...movie
    }
  }

  ${movieFragment}
`
