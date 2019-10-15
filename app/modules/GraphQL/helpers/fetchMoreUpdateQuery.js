/**
 * Helper method for the fetchMore queries
 *
 * @param {string} type - show, movies or bookmarks
 * @param {object} data - Data from the current query
 * @param {function} fetchMore - The fetchMore function from the current query
 * @return {Function}
 */
export default (type, data, fetchMore) => () => {
  return fetchMore({
    variables: {
      offset: data[type].length,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult || !fetchMoreResult[type]) {
        return prev
      }

      return {
        [type]: [...prev[type], ...fetchMoreResult[type]],
      }
    },
  })
}

