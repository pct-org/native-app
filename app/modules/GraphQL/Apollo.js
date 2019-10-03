import AsyncStorage from '@react-native-community/async-storage'
import FSStorage from 'redux-persist-fs-storage'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const SCHEMA_VERSION = '1' // Must be a string.
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

export default async() => {
  const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null,

    cacheRedirects: {
      Query: {
        movie: (_, args, { getCacheKey }) => {
          return getCacheKey({
            __typename: 'Movie',
            _id: args._id,
          })
        },
        show: (_, args, { getCacheKey }) => {
          return getCacheKey({
            __typename: 'Show',
            _id: args._id,
          })
        },
      },
    },
  })

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
        uri: 'ws://192.168.43.228:3000/graphql',
      }),
      new HttpLink({
        uri: 'http://192.168.43.228:3000/graphql',
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
