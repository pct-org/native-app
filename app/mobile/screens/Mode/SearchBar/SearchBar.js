import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar, TextInput, Animated } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useCollapsibleStack } from 'react-navigation-collapsible'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'

import Container from 'components/Container'
import Icon from 'components/Icon'
import IconButton from 'components/IconButton'

export const styles = StyleSheet.create({

  root: {
    position: 'absolute',
    width: '100%',
    height: dimensions.SEARCH_BAR_HEIGHT,
    top: StatusBar.currentHeight + dimensions.UNIT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: dimensions.SCREEN_WIDTH - (dimensions.UNIT * 2),
    borderRadius: dimensions.SEARCH_BAR_BORDER_RADIOS,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: '100%',
    flex: 1,
    color: colors.ICON.WHITE,
  },

  icon: {
    margin: dimensions.UNIT,
  },

})

export const SearchBar = ({ searchedQuery, search, flatListRef }) => {
  const navigation = useNavigation()
  const [query, setQuery] = useState(searchedQuery)
  const [timeout, setTheTimeout] = useState(null)

  useEffect(() => {
    // Search is cleared also clear it here
    if (searchedQuery === null) {
      setQuery(null)
    }
  }, [searchedQuery])

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
          flatListRef.current.scrollToOffset({ offset: 0, animated: true })
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
      collapsibleSubHeaderHeight: height + StatusBar.currentHeight + dimensions.UNIT,
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

        <Icon
          style={styles.icon}
          name={'magnify'}
          color={'white'}
          emphasis={'medium'}
          size={dimensions.SEARCH_BAR_ICON_SIZE}
        />

        <TextInput
          style={styles.input}
          selectionColor={colors.WHITE}
          underlineColorAndroid={'transparent'}
          onChangeText={handleSearch}
          value={query} />

        {searchedQuery && (
          <Animatable.View
            style={styles.icon}
            animation={searchedQuery.trim().length > 0 ? 'zoomIn' : 'zoomOut'}
            duration={constants.ANIMATION_DURATIONS.enteringScreen}
            useNativeDriver>
            <IconButton
              name={'close-circle'}
              color={'primary'}
              onPress={cancelSearch}
              size={dimensions.SEARCH_BAR_ICON_SIZE}
            />
          </Animatable.View>
        )}

        {!searchedQuery && (
          <Animatable.View
            style={styles.icon}
            animation={query?.trim()?.length > 0 ? 'zoomOut' : 'zoomIn'}
            duration={constants.ANIMATION_DURATIONS.enteringScreen}
            useNativeDriver>
            <IconButton
              name={'dots-vertical'}
              color={'primary'}
              emphasis={'medium'}
              onPress={console.log}
              size={dimensions.SEARCH_BAR_ICON_SIZE}
            />
          </Animatable.View>
        )}
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
