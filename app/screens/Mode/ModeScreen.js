import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Orientation from 'react-native-orientation'
import { Constants } from 'popcorn-sdk'

import colors from 'modules/colors'

import CardList from 'components/CardList'
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
    top     : 0,
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

    return modes[mode].items
  }

  handleItemOpen = (item) => {
    const { navigation } = this.props

    navigation.navigate('Item', item)
  }

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
              ListHeaderComponent={<View style={{ marginTop: 28 }} />}
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
