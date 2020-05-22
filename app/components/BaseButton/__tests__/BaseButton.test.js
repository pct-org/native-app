import React from 'react'
import { shallow } from 'enzyme'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import BaseButton from '../BaseButton'

describe('(Component) BaseButton', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <BaseButton>
        test
      </BaseButton>,
    )

    expect(result).toMatchSnapshot()
    expect(TouchableNativeFeedback.Ripple).toHaveBeenCalledTimes(1)
  })

  it('should render with no ripple', () => {
    TouchableNativeFeedback.Ripple.mockClear()

    const result = shallow(
      <BaseButton
        rippleColor={null}>
        test
      </BaseButton>,
    )

    expect(result).toMatchSnapshot()
    expect(TouchableNativeFeedback.Ripple).toHaveBeenCalledTimes(0)
  })

})
