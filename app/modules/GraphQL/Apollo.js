import AsyncStorage from '@react-native-community/async-storage'
import FSStorage from 'redux-persist-fs-storage'
import { ApolloClient, split, HttpLink, InMemoryCache, defaultDataIdFromObject } from '@apollo/client'
import { CachePersistor } from 'apollo-cache-persist'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const SCHEMA_VERSION = '6' // Must be a string.
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

export default async(host) => {
  const cache = new InMemoryCache({})

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

    link: split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      new WebSocketLink({
        uri: `ws://${host}/graphql`,
      }),
      new HttpLink({
        uri: `http://${host}/graphql`,
      }),
    ),

    connectToDevTools: __DEV__,

    name: 'Native App',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}
