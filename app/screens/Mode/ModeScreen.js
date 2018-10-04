import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import Orientation from 'react-native-orientation'

import Card from 'components/Card'
import FullScreenLoading from 'components/FullScreenLoading'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
    position       : 'relative',
  },

  container: {
    flexDirection: 'column',
  },

  list: {
    marginTop: 32,
  },

  listItem: {
    marginTop: 16,
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
    page: 1,
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

  render() {
    const { isLoading, hasInternet } = this.props

    const items = this.getItems()

    return (
      <View style={styles.root}>

        <StatusBar backgroundColor={'rgba(0, 0, 0, 0.20)'} animated />

        <FullScreenLoading enabled={isLoading && items.length === 0} />

        {hasInternet && (
          <FlatList
            columnWrapperStyle={styles.listItem}
            data={items}
            numColumns={3}
            initialNumToRender={12}
            renderItem={this.renderCard}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReachedThreshold={100}
            onEndReached={this.handleEndReached}
            ListHeaderComponent={() => <View style={{ marginTop: 16 }} />}
            ListFooterComponent={() => <View style={{ marginBottom: 16 }} />}
          />
        )}

        {!hasInternet && (
          <Text>No internet!</Text>
        )}

      </View>
    )
  }

}
