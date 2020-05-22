import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'

import getClient from 'modules/GraphQL/Apollo'

import ApolloLoader from '../ApolloLoader'

jest.mock('modules/GraphQL/Apollo', () => jest.fn())

describe('(Component) ApolloClient', () => {

  const component = (
    <ApolloLoader>
      <View />
    </ApolloLoader>
  )

  it('should start loading', () => {
    const wrapper = shallow(component)

    expect(wrapper).toMatchSnapshot()
  })

  it('should finish loading', async() => {
    const wrapper = shallow(component)

    await wrapper.instance().componentDidMount()
    expect(await getClient).toHaveBeenCalled()
    expect(wrapper).toMatchSnapshot()
  })
})
