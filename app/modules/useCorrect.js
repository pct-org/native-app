import { Platform } from 'react-native'
import Device from 'modules/DeviceDetection'

export default (mobile, tablet, tv) => {
  if (Platform.isTV && tv) {
    return tv
  }

  if (Device.isTablet && tablet) {
    return tablet
  }

  return mobile
}
