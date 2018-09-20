import debug from 'debug'

import type { ShowType } from 'api/Metadata/MetadataTypes'
import { TorrentProviderInterface } from './TorrentsProviderInterface'

const log = debug('app/api:torrents:adapter')

export default class TorrentsAdapter implements TorrentProviderInterface {

  providers = []

}
