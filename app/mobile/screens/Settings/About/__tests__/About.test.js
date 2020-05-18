import React from 'react'
import { shallow } from 'enzyme'
import Updater  from 'update-react-native-app'

import { About } from '../About'

jest.mock('update-react-native-app')

describe('(Screens) Settings > About', () => {

  it('should render with everything unknown', () => {
    const result = shallow(
      <About />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with everything unknown when data incorrect', () => {
    const result = shallow(
      <About
        data={{ fakeData: true }}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with app version', () => {
    Updater.UpdateRNApp = {
      versionName: 'test version'
    }

    const result = shallow(
      <About />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render', () => {
    const result = shallow(
      <About
        data={{
          status: {
            version: 'test',
            totalMovies: 1,
            totalShows: 1,
          },
          scraper: {
            version: 'test',
            uptime: 10,
            status: 'idle',
            updated: 'test',
            nextUpdate: 'test'
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })


})
