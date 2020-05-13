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

export const ActiveDownloads =  gql`
  query {

    activeDownloads {
      _id
      type
      itemType
      status
      quality
      progress
      numPeers
      speed
      timeRemaining
      movie {
        title
      }
      episode {
        title
        season
        number
        show {
          title
        }
      }
      __typename
    }

  }
`
