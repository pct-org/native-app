import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const useAsyncStorage = (key) => {
  const [storageItem, setStorageItem] = useState(null)

  useEffect(() => {
    getStorageItem()
  }, [])

  const getStorageItem = async() => {
    const data = await AsyncStorage.getItem(key)

    setStorageItem(data)
  }

  function updateStorageItem(data) {
    if (typeof data === 'string') {
      AsyncStorage.setItem(key, data)
      setStorageItem(data)

    } else if (data === null) {
      clearStorageItem()
    }

    return data
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key)

    setStorageItem(null)
  }

  return [storageItem, updateStorageItem, clearStorageItem]
}

export default useAsyncStorage
