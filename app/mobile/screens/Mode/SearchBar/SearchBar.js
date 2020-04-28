import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar, TextInput, Animated } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useCollapsibleStack } from 'react-navigation-collapsible'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import Container from 'components/Container'
import Icon from 'components/Icon'
import IconButton from 'components/IconButton'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    width: '100%',
    height: 50,
    top: StatusBar.currentHeight + dimensions.UNIT,
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

export const SearchBar = ({ searchedQuery, search, flatListRef }) => {
  const navigation = useNavigation()
  const [query, setQuery] = useState(searchedQuery)
  const [timeout, setTheTimeout] = useState(null)

  const { translateY } = useCollapsibleStack()

  const cancelSearch = () => {
    setQuery(null)
    search(null)

    if (timeout) {
      clearTimeout(timeout)
    }
  }

  const handleSearch = (text) => {
    if (text.trim().length === 0) {
      cancelSearch()

    } else {
      setQuery(text)

      if (timeout) {
        clearTimeout(timeout)
      }

      setTheTimeout(setTimeout(() => {
        search(text)

        // Scroll to top
        if (flatListRef && flatListRef.current) {
          flatListRef.current.getNode().scrollToOffset({ offset: 0, animated: true })
        }
      }, 500))
    }
  }

  const handleLayout = ({
    nativeEvent: {
      layout: { height = 0 },
    },
  }) => {
    navigation.setParams({
      collapsibleSubHeaderHeight: height + StatusBar.currentHeight,
      isCollapsibleDirty: true,
    })
  }

  return (
    <Animated.View
      onLayout={handleLayout}
      style={{
        transform: [{ translateY }],
        ...styles.root,
      }}>

      <Container
        elevation={1}
        style={styles.container}>

        {searchedQuery && (
          <Animatable.View
            style={styles.cancel}
            animation={searchedQuery.trim().length > 0 ? 'zoomIn' : 'zoomOut'}
            duration={300}
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
          onChangeText={handleSearch}
          value={query} />

      </Container>

    </Animated.View>
  )
}

SearchBar.propTypes = {
  searchedQuery: PropTypes.string,
  search: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  searchedQuery: null,
}

export default SearchBar
