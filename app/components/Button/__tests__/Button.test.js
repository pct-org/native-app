import React from 'react'
import { shallow } from 'enzyme'

import Button from '../Button'

describe('(Component) Button', () => {

  it('should render default', () => {
    const result = shallow(
      <Button
        onPress={jest.fn()}>
        test
      </Button>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render primary', () => {
    const result = shallow(
      <Button
        onPress={jest.fn()}
        variant={'primary'}>
        test
      </Button>,
    )

    expect(result).toMatchSnapshot()
  })

})
