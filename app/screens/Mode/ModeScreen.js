import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native'
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Constants } from 'popcorn-sdk'
import { withNavigationFocus } from 'react-navigation'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CardList from 'components/CardList'
import IconButton from 'components/IconButton'
import FullScreenLoading from 'components/FullScreenLoading'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
    position       : 'relative',
  },

  searchRoot: {
    width         : '100%',
    height        : 50,
    marginTop     : StatusBar.currentHeight + dimensions.UNIT * 2,
    marginBottom  : dimensions.UNIT,
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
  },

  searchContainer: {
    backgroundColor: colors.BACKGROUND_LIGHTER,
    width          : dimensions.SCREEN_WIDTH - (dimensions.UNIT * 4),
    height         : '100%',
    borderRadius   : dimensions.BORDER_RADIUS,
  },

  input: {
    height    : '100%',
    width     : '80%',
    color     : '#FFF',
    marginLeft: 40,
  },

  cancelSearch: {
    position: 'absolute',
    right   : dimensions.UNIT,
    top     : 0,
  },

  searchIcon: {
    position: 'absolute',
    left    : dimensions.UNIT,
    top     : dimensions.UNIT,
  },

})

export class Mode extends React.Component {

  static propTypes = {
    isLoading  : PropTypes.bool,
    hasInternet: PropTypes.bool,

    modes     : PropTypes.object.isRequired,
    getItems  : PropTypes.func.isRequired,
    mode      : PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isLoading  : false,
    hasInternet: true,
  }

  state = {
    page       : 1,
    firstSearch: true,
    searching  : false,
    searchText : '',
  }

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  getItems = () => {
    const { modes, mode } = this.props
    const { searching } = this.state

    if (searching) {
      return modes[`${mode}Search`].items
    }

    return modes[mode].items
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

  handleSearch = () => {
    const { isLoading, getItems, mode } = this.props
    const { searchText } = this.state

    if (!isLoading && searchText.trim().length > 0) {
      getItems(`${mode}Search`, 1, { keywords: searchText }).then(() => {
        this.setState({
          searching: true,
        })
      })
    }
  }

  handleCancelSearch = () => {
    this.setState({
      searchText: '',
      searching : false,
    })
  }

  handleTextChange = text => this.setState({ searchText: text, firstSearch: false })

  handleEndReached = () => {
    const { isLoading, getItems, mode, isFocused } = this.props
    const { page } = this.state

    if (mode === Constants.TYPE_BOOKMARK || isLoading || !isFocused) {
      return
    }

    const nPage = page + 1

    this.setState({
      page: nPage,
    }, () => {
      if (!isLoading) {
        getItems(mode, nPage)
      }
    })
  }

  renderSearchBar = () => {
    const { searchText, firstSearch } = this.state

    return (
      <View style={styles.searchRoot}>

        <View style={styles.searchContainer}>

          <Animatable.View
            style={styles.cancelSearch}
            animation={searchText.trim().length > 0 ? 'zoomIn' : 'zoomOut'}
            duration={firstSearch ? 1 : 300}
            useNativeDriver>
            <IconButton
              name={'close-circle'}
              color={'#FFF'}
              onPress={this.handleCancelSearch}
              size={32}
            />
          </Animatable.View>

          <Icon
            style={styles.searchIcon}
            name={'magnify'}
            color={'#FFF'}
            size={32}
          />

          <TextInput
            style={styles.input}
            selectionColor={'#FFF'}
            underlineColorAndroid={'transparent'}
            onChangeText={this.handleTextChange}
            onSubmitEditing={this.handleSearch}
            value={searchText} />

        </View>

      </View>
    )
  }

  render() {
    const { isLoading, hasInternet } = this.props

    const items = this.getItems()

    return (
      <View style={styles.root}>

        <StatusBar backgroundColor={'rgba(0, 0, 0, 0.20)'} animated />

        <FullScreenLoading enabled={isLoading && items.length === 0} />

        {hasInternet && (
          <React.Fragment>

            <CardList
              items={items}
              ListHeaderComponent={this.renderSearchBar}
              onEndReached={this.handleEndReached}
            />

          </React.Fragment>
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}

export default withNavigationFocus(Mode)
