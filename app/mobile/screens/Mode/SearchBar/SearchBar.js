import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, StatusBar, TextInput, Animated, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'
import constants from 'modules/constants'
import i18n from 'modules/i18n'
import { useBottomSheet } from 'modules/BottomSheetManager'

import Container from 'components/Container'
import Icon from 'components/Icon'
import IconButton from 'components/IconButton'
import OptionsGroup from 'mobile/components/OptionsGroup'
import OptionsHeader from 'mobile/components/OptionsHeader'
import OptionsItem from 'mobile/components/OptionsItem'

export const styles = StyleSheet.create({

  root: {
    width: '100%',
    height: dimensions.SEARCH_BAR_HEIGHT,
    marginTop: StatusBar.currentHeight + dimensions.UNIT,
    marginBottom: dimensions.UNIT,
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

export const SearchBar = ({ searchedQuery, search, flatListRef, mode, setSorting, setFilter }) => {
  const [openBottomSheet, updateBottomSheet, closeBottomSheet] = useBottomSheet()
  const navigation = useNavigation()
  const [query, setQuery] = useState(searchedQuery)
  const [timeout, setTheTimeout] = useState(null)

  const bottomSheetOptions = React.useMemo(() => {
    if (mode === constants.MODE_BOOKMARKS) {
      return [
        { icon: 'all-inclusive', label: i18n.t('All'), value: undefined },
        { icon: 'movie', label: i18n.t('Movies'), value: 'movies' },
        { icon: 'filmstrip-box-multiple', label: i18n.t('Shows'), value: 'shows' },
      ]
    }

    return [
      { icon: 'trending-up', label: i18n.t('Trending'), value: 'trending' },
      { icon: 'cards-heart', label: i18n.t('Popularity'), value: 'popularity' },
      { icon: 'alphabetical', label: i18n.t('Name'), value: 'name' },
      { icon: 'star', label: i18n.t('Rating'), value: 'rating' },
      { icon: 'calendar', label: i18n.t('Released'), value: 'released' },
      { icon: 'calendar-range', label: i18n.t('Year'), value: 'year' },
      { icon: 'calendar-plus', label: i18n.t('Added'), value: 'added' },
    ]
  }, [mode])

  useEffect(() => {
    // Search is cleared also clear it here
    if (searchedQuery === null) {
      setQuery(null)
    }
  }, [searchedQuery])

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

  const handleLayout = ({ nativeEvent: { layout: { height = 0 } } }) => {
    navigation.setParams({
      collapsibleSubHeaderHeight: height + StatusBar.currentHeight + dimensions.UNIT,
      isCollapsibleDirty: true,
    })
  }

  const handleFilterOrSortPress = React.useCallback((option) => () => {
    if (mode === constants.MODE_BOOKMARKS) {
      setFilter(option.value)

    } else {
      setSorting(option.value)
    }

    closeBottomSheet()
  }, [mode, closeBottomSheet])

  const renderBottomSheetContent = React.useCallback(() => {
    return (
      <View>
        <OptionsHeader label={
          mode === constants.MODE_BOOKMARKS
            ? i18n.t('Filter')
            : i18n.t('Sorting')
        } />

        <OptionsGroup style={styles.marginBottomOnly}>
          {bottomSheetOptions.map((option) => (
            <OptionsItem
              key={option.label}
              icon={option.icon}
              label={option.label}
              onPress={handleFilterOrSortPress(option)} />
          ))}
        </OptionsGroup>
      </View>
    )
  }, [mode])

  const showBottomSheet = () => {
    const contentHeight = 100 + (bottomSheetOptions.length * 30)

    openBottomSheet({
      renderContent: renderBottomSheetContent,
      snapPoints: [
        contentHeight,
        contentHeight,
        0,
      ],
      contentHeight: contentHeight,
      onClose: null,
    })
  }

  return (
    <Animated.View
      onLayout={handleLayout}
      style={styles.root}>

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
          <IconButton
            style={styles.icon}
            name={'close-circle'}
            color={'primary'}
            onPress={cancelSearch}
            size={dimensions.SEARCH_BAR_ICON_SIZE}
            animatable={{
              animation: searchedQuery.trim().length > 0 ? 'zoomIn' : 'zoomOut',
              duration: constants.ANIMATION_DURATIONS.enteringScreen,
              useNativeDriver: true,
            }}
          />
        )}

        {!searchedQuery && (
          <IconButton
            style={styles.icon}
            name={'dots-vertical'}
            color={'primary'}
            emphasis={'medium'}
            onPress={showBottomSheet}
            size={dimensions.SEARCH_BAR_ICON_SIZE}
            animatable={{
              animation: query?.trim()?.length > 0 ? 'zoomOut' : 'zoomIn',
              duration: constants.ANIMATION_DURATIONS.enteringScreen,
              useNativeDriver: true,
            }}
          />
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
