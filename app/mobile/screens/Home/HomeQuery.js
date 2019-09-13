import gql from 'graphql-tag'

export const MoviesAndBookmarksQuery = gql`
query movies($offset: Float!) {
  bookmarks {
    title
    images {
      poster {
        thumb
      }
    }
  }
  
  movies(limit:25 offset: $offset noBookmarks: true noWatched: true){
    title
    genres
    synopsis
    images {
      backdrop {
        high
      }
      poster {
        thumb
      }
    }
  }
}
`


export const ShowsQuery = gql`
query {
  shows(limit:25 noBookmarks: true){
    title
    images {
      poster {
        thumb
      }
    }
  }
} 
`
