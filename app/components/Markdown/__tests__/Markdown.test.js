import React from 'react'
import { shallow } from 'enzyme'

import Markdown from '../Markdown'

describe('(Component) Markdown', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <Markdown>
        ## Markdown test
      </Markdown>,
    )

    expect(result).toMatchSnapshot()
  })

})
