import React from 'react'
import { shallow } from 'enzyme'

import Container from '../Container'

describe('(Component) Container', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <Container>
        test
      </Container>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with elevation 1', () => {
    const result = shallow(
      <Container
        elevation={1}>
        test
      </Container>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with elevation 2 and custom style', () => {
    const result = shallow(
      <Container
        style={{ margin: 20 }}
        elevation={1}>
        test
      </Container>,
    )

    expect(result).toMatchSnapshot()
  })

})
