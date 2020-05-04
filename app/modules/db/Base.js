import AsyncStorage from '@react-native-community/async-storage'

export default class Base {

  getItem = AsyncStorage.getItem

  setItem = AsyncStorage.setItem

  removeItem = AsyncStorage.removeItem

}
