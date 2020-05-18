import React from 'react'
import { shallow } from 'enzyme'

import { Downloads } from '../Downloads'

describe('(Screens) Settings > Downloads', () => {

  const downloadManager = {
    removeDownload: jest.fn(),
    onPress: jest.fn(),
  }

  it('should render empty list correctly', () => {
    const result = shallow(
      <Downloads
        downloadManager={downloadManager}
        executeQuery={jest.fn()}
        data={null}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render list correctly', () => {
    const result = shallow(
      <Downloads
        downloadManager={downloadManager}
        executeQuery={jest.fn()}
        data={{ activeDownloads: [{ _id: 1 }] }}
      />,
    )

    expect(result).toMatchSnapshot()
  })


})
