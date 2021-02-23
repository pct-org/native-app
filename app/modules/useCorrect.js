import { Platform } from 'react-native'
import Device from 'modules/DeviceDetection'

export default (mobile, tablet, tv) => {
  if (Platform.isTV && tv !== null) {
    return tv
  }

  if (Device.isTablet && tablet !== null) {
    return tablet
  }

  return mobile
}
