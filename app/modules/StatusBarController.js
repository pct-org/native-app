import { StatusBar } from 'react-native'

export default new (class StatusBarController {

  currentActiveBackgroundColor = 'rgba(0, 0, 0, 0)'
  previousActiveBackgroundColor = 'rgba(0, 0, 0, 0)'

  update = (newColor) => {
    this.previousActiveBackgroundColor = this.currentActiveBackgroundColor
    this.currentActiveBackgroundColor = newColor

    StatusBar.setBackgroundColor(this.currentActiveBackgroundColor, true)
  }

  setHidden = (hidden) => {
    StatusBar.setHidden(hidden, true)
  }

})()
