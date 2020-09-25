import gql from 'graphql-tag'

export const AboutQuery =  gql`
  query {
    
    status {
      version
      totalMovies
      totalShows
      totalEpisodes
    }
    
    scraper {
      status
      version
      uptime
      updated
      nextUpdate
    }
    
  }
`
