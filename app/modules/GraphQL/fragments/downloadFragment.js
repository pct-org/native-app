import { gql } from '@apollo/client'

export default gql`
  fragment download on Download {
    _id
    type
    itemType
    torrentType
    status
    quality
    progress
    numPeers
    speed
    timeRemaining
    subtitles {
      language
      code
    }
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
  }
`
