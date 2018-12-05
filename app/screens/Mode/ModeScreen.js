import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, FlatList, StatusBar, TextInput } from 'react-native'
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Constants } from 'popcorn-sdk'

import colors from 'modules/colors'

import Card from 'components/Card'
import IconButton from 'components/IconButton'
import FullScreenLoading from 'components/FullScreenLoading'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
    position       : 'relative',
  },

  container: {
    flexDirection: 'column',
  },

  listItem: {
    marginTop: 16,
  },

  searchRoot: {
    width         : '100%',
    height        : 50,
    marginTop     : 40,
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
  },

  searchContainer: {
    backgroundColor: colors.BACKGROUND_LIGHTER,
    width          : '90%',
    height         : '100%',
  },

  input: {
    height    : '100%',
    width     : '80%',
    color     : '#FFF',
    marginLeft: 40,
  },

  cancelSearch: {
    position: 'absolute',
    right   : 8,
    top: 0,
  },

  searchIcon: {
    position: 'absolute',
    left    : 8,
    top     : 8,
  },

})

export default class Mode extends React.Component {

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
    const { isLoading, getItems, mode } = this.props
    const { page } = this.state

    if (mode === Constants.TYPE_BOOKMARK) {
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

  renderCard = ({ item }) => (
    <Card
      item={item}
      onPress={() => this.handleItemOpen(item)}
    />
  )

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

            <FlatList
              columnWrapperStyle={styles.listItem}
              data={items}
              numColumns={3}
              initialNumToRender={12}
              renderItem={this.renderCard}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              onEndReachedThreshold={100}
              onEndReached={this.handleEndReached}
              ListHeaderComponent={this.renderSearchBar}
              ListFooterComponent={() => <View style={{ marginBottom: 16 }} />}
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
