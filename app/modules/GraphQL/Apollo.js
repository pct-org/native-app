import AsyncStorage from '@react-native-community/async-storage'
import FSStorage from 'redux-persist-fs-storage'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

const SCHEMA_VERSION = '1' // Must be a string.
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

export default async() => {
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: FSStorage(),
    trigger: 'background',

    debug: __DEV__,
  })

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore()

  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge()
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  // Continue setting up Apollo as usual.
  return new ApolloClient({
    cache,

    link: new HttpLink({
      uri: 'http://10.0.2.2:3000/graphql',
    }),

    name: 'Native App',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}
