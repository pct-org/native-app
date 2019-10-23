import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar, View, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import Container from 'components/Container'
import Icon from 'components/Icon'
import IconButton from 'components/IconButton'

export const styles = StyleSheet.create({

  root: {
    width: '100%',
    height: 50,
    marginTop: StatusBar.currentHeight + dimensions.UNIT,
    marginBottom: dimensions.UNIT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: dimensions.SCREEN_WIDTH - (dimensions.UNIT * 2),
    height: '100%',
    borderRadius: dimensions.BORDER_RADIUS,
    overflow: 'hidden',
  },

  input: {
    height: '100%',
    width: '80%',
    color: colors.ICON.WHITE,
    marginLeft: 40,
  },

  cancel: {
    position: 'absolute',
    right: dimensions.UNIT,
    top: dimensions.UNIT,
  },

  icon: {
    position: 'absolute',
    left: dimensions.UNIT,
    top: dimensions.UNIT,
  },

})

export const SearchBar = ({ query: searchedQuery, setQuery: search }) => {
  const [query, setQuery] = useState(searchedQuery)
  const [timeout, setTheTimeout] = useState(null)

  const cancelSearch = () => {
    search(null)

    if (timeout) {
      clearTimeout(timeout)
    }
  }

  return (
    <View style={styles.root}>

      <Container
        elevation={1}
        style={styles.container}>

        {searchedQuery && (
          <Animatable.View
            style={styles.cancel}
            animation={searchedQuery.trim().length > 0 ? 'zoomIn' : 'zoomOut'}
            duration={searchedQuery
              ? 1
              : 300
            }
            useNativeDriver>
            <IconButton
              name={'close-circle'}
              color={'primary'}
              onPress={cancelSearch}
              size={dimensions.ICON_SIZE_MEDIUM}
            />
          </Animatable.View>
        )}

        <Icon
          style={styles.icon}
          name={'magnify'}
          color={'white'}
          size={dimensions.ICON_SIZE_MEDIUM}
        />

        <TextInput
          style={styles.input}
          selectionColor={'#FFF'}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => {
            if (text.trim().length === 0) {
              cancelSearch()

            } else {
              setQuery(text)

              if (timeout) {
                clearTimeout(timeout)
              }

              setTheTimeout(setTimeout(() => {
                search(text)
              }, 500))
            }
          }}
          value={query} />

      </Container>

    </View>
  )
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  query: null,
}

export default SearchBar
