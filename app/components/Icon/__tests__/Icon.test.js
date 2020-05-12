import React from 'react'
import { shallow } from 'enzyme'

import Icon from '../Icon'

describe('(Component) Icon', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <Icon name={'settings'} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with emphasis medium', () => {
    const result = shallow(
      <Icon name={'settings'} emphasis={'medium'} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with emphasis low', () => {
    const result = shallow(
      <Icon name={'settings'} emphasis={'low'} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with a different size', () => {
    const result = shallow(
      <Icon name={'settings'} size={15} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with a different color', () => {
    const result = shallow(
      <Icon name={'settings'} color={'primary'} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with custom style', () => {
    const result = shallow(
      <Icon name={'settings'} style={{ padding: 20 }} />,
    )

    expect(result).toMatchSnapshot()
  })

})
