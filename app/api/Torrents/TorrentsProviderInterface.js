// @flow
export interface TorrentProviderInterface {

  searchEpisode: (item: Object, season: string, episode: string) => Promise<void>,

  search: (search: string) => Promise<void>,

}
