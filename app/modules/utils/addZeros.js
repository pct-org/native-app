export const date =  (date) => {
  return `${`0${date.getDate()}`.slice(-2)}-${`0${(date.getMonth() + 1)}`.slice(-2)}-${date.getFullYear()}`
}

export const episode =  (season, episode) => {
  return `S${`0${season}`.slice(-2)}E${`0${episode}`.slice(-2)}`
}

export default {
  date,
  episode
}
