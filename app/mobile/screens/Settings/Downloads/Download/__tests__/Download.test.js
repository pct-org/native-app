import React from 'react'
import { shallow } from 'enzyme'

import usePollingForDownload from 'modules/hooks/usePollingForDownload'

import Download from '../Download'

jest.mock('modules/GraphQL/usePollingForDownload')

describe('(Screens) Settings > Downloads > Download', () => {

  const downloadManager = {
    removeDownload: jest.fn(),
    onPress: jest.fn(),
  }

  it('should render queued correctly for episode', () => {
    const result = shallow(
      <Download
        downloadManager={downloadManager}
        refreshScreen={jest.fn()}
        download={{
          status: 'queued',
          progress: 0,
          speed: 0,
          timeRemaining: 0,
          numPeers: 0,
          movie: null,
          episode: {
            title: 'episode',
            season: 1,
            number: 1,
            show: {
              title: 'show',
            },
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render queued correctly for movie', () => {
    const result = shallow(
      <Download
        downloadManager={downloadManager}
        refreshScreen={jest.fn()}
        download={{
          status: 'queued',
          progress: 0,
          speed: 0,
          timeRemaining: 0,
          numPeers: 0,
          movie: {
            title: 'movie',
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render downloading correctly for movie', () => {
    const result = shallow(
      <Download
        downloadManager={downloadManager}
        refreshScreen={jest.fn()}
        download={{
          status: 'downloading',
          progress: 10,
          speed: '50 kbs',
          timeRemaining: '5 minutes',
          numPeers: 6,
          movie: {
            title: 'movie',
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })


})
