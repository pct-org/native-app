export type TorrentType = {
  url: string,
  seeds: number,
  peers: number,
  size: number,
  filesize: string,
  provider: string,
  quality: string,
  health: {
    text: string,
    number: number,
    color: string,
    ratio: number,
  }
}
