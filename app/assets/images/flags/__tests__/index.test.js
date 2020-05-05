import * as React from 'react'
import { shallow } from 'enzyme'

import index from '../index'

describe('(Images) Flags', () => {

  it('should match generated snapshot', () => {
    expect(index).toMatchSnapshot()
  })

})
