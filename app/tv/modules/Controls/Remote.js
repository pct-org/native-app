import { Platform } from 'react-native'

/**
 * TODO:: Better name?
 */
export default class Remote {

  /**
   * Wrapper for onPress to make sure it's only called on key down
   *
   * @param onPress
   * @returns {function(*)}
   */
  static onPress = (onPress) => (event) => {
    if (!Platform.isTV) {
      onPress(event)

    } else if (event.eventKeyAction === 0) {
      onPress(event)
    }
  }

}
