import React, { PixelRatio, Dimensions } from 'react-native'

const windowSize = Dimensions.get('window')

export default new (class DetectDeviceService {
  constructor() {
    this.pixelDensity = PixelRatio.get()
    this.width = windowSize.width
    this.height = windowSize.height
    this.adjustedWidth = this.width * this.pixelDensity
    this.adjustedHeight = this.height * this.pixelDensity

    this.isPhoneOrTablet()
  }

  isPhoneOrTablet() {
    if (this.pixelDensity < 2 && (this.adjustedWidth >= 1000 || this.adjustedHeight >= 1000)) {
      this.isTablet = true
      this.isPhone = false

    } else if (this.pixelDensity === 2 && (this.adjustedWidth >= 1824 || this.adjustedHeight >= 1824)) {
      this.isTablet = true
      this.isPhone = false

    } else {
      this.isTablet = false
      this.isPhone = true
    }
  }

})()
