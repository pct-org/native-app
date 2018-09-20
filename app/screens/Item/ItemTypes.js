import type { DeviceType } from 'api/Player/StreamingProviders/StreamingTypes'
import type { ContentType } from 'api/Metadata/MetadataTypes'
import type { TorrentType } from 'api/Torrents/TorrentsTypes'
import { PlayerProviderInterface } from 'api/Player/PlayerInterface'

export type Props = {
  item: ContentType,
  isLoading: boolean,
  fetchingEpisodeTorrents: boolean,

  player: PlayerProviderInterface,
  playerStatus: string,
  devices: Array<DeviceType>,
  torrentStatus: string,
}

export type State = {
  torrent: TorrentType,
}
