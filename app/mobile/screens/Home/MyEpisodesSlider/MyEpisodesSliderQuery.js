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
      show {
        title
      }
    }
  }
`
