import gql from 'graphql-tag'

export default gql`
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
