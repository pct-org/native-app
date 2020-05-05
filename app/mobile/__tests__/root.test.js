import * as React from 'react'
import { shallow } from 'enzyme'

import Root from '../root'

describe('(Mobile) Root', () => {

  it('should match generated snapshot', () => {
    const wrapper = shallow(<Root />)
    expect(wrapper).toMatchSnapshot()
  })

})
