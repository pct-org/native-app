import React from 'react'
import { View } from 'react-native'

export default {
  play: jest.fn(),
  pause: jest.fn(),
  stop: jest.fn(),
  EventEmitter: {
    _nativeModule: {
      addListener: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
    },
  },
  SESSION_STARTED: 'SESSION_STARTED',
  SESSION_START_FAILED: 'SESSION_START_FAILED',
  SESSION_SUSPENDED: 'SESSION_SUSPENDED',
  SESSION_RESUMED: 'SESSION_RESUMED',
  SESSION_ENDED: 'SESSION_ENDED',
  MEDIA_STATUS_UPDATED: 'MEDIA_STATUS_UPDATED',
  MEDIA_PLAYBACK_STARTED: 'MEDIA_PLAYBACK_STARTED',
  MEDIA_PLAYBACK_ENDED: 'MEDIA_PLAYBACK_ENDED',
  getCastState: jest.fn(() => Promise.resolve('Connected')),
  castMedia: jest.fn(),
  getCastDevice: jest.fn(() => Promise.resolve({ name: 'Test Device Name' })),
  CastButton: (props) => (<View {...props} />),
}
