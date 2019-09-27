import gql from 'graphql-tag'

export default gql`
  query episodes {
    episodes: myEpisodes{
      _id
      title
      season
      number
      type
      watched {
        complete
      }
      images {
        poster {
          thumb
        }
      }
      torrents {
        quality
        sizeString
      }
      show {
        title
        images {
          poster {
            thumb
          }
        }
      }
    }
  }
`
