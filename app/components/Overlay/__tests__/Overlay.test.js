import React from 'react'
import { shallow } from 'enzyme'

import Overlay from '../Overlay'

describe('(Component) Overlay', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <Overlay />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render dark variant', () => {
    const result = shallow(
      <Overlay variant={'dark'} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with animation', () => {
    const result = shallow(
      <Overlay withAnimation />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with custom style', () => {
    const result = shallow(
      <Overlay style={{ margin: 5 }} />,
    )

    expect(result).toMatchSnapshot()
  })

})
