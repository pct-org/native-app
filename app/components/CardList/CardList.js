import React from 'react'
import { View, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'

import Device from 'modules/DeviceDetection'

import Card from 'components/Card'

export class CardList extends React.Component {

  handleItemOpen = (item) => {
    const { handleItemOpen, navigation } = this.props

    if (handleItemOpen) {
      handleItemOpen(item)

    } else {
      navigation.navigate('Item', item)
    }
  }

  renderCard = ({ item }) => (
    <Card
      item={item}
      onPress={() => this.handleItemOpen(item)}
    />
  )

  render() {
    const { items, handleItemOpen, ...props } = this.props

    return (
      <FlatList
        columnWrapperStyle={{ margin: 4 }}
        removeClippedSubviews
        data={items}
        numColumns={Device.isTablet ? 4 : 3}
        initialNumToRender={12}
        windowSize={32}
        renderItem={this.renderCard}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListFooterComponent={() => <View style={{ marginBottom: 16 }} />}
        {...props}
      />
    )
  }

}

export default withNavigation(CardList)
