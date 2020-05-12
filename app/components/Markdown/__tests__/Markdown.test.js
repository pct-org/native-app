import React from 'react'
import { shallow } from 'enzyme'

import Markdown from '../Markdown'

describe('(Component) Markdown', () => {

  it('should render', () => {
    const result = shallow(
      <Markdown>
        ## Test markdown

        - test
      </Markdown>,
    )

    expect(result).toMatchSnapshot()
  })

})
