/* eslint-disable */
import MockAsyncStorage from 'mock-async-storage'

jest.mock('react-native', () => {
  const Real = jest.requireActual('react-native')

  Real.NativeModules.RNCNetInfo = {
    getCurrentState: jest.fn(() => Promise.resolve()),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  }

  Real.NativeModules.RNDeviceInfo = {

  }

  return Real
})

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
}))
