import React from 'react'
import { shallow } from 'enzyme'

import CoverGradient from '../CoverGradient'

describe('(Component) CoverGradient', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <CoverGradient />,
    )

    expect(result).toMatchSnapshot()
  })

})
