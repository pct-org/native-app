import React from 'react'
import { View, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'

import dimensions from 'modules/dimensions'
import useCorrect from 'modules/useCorrect'

import Card from 'components/Card'

export const styles = {

  container: {
    marginLeft: dimensions.UNIT,
    marginRight: dimensions.UNIT,
  },

  cardContainer: {
    marginLeft: dimensions.UNIT / 2,
    marginRight: dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT / 2,
  },
}

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
    <View style={{ margin: dimensions.UNIT / 2 }}>
      <Card
        variant={'medium'}
        item={item}
        onPress={() => this.handleItemOpen(item)}
      />
    </View>
  )

  render() {
    const { items, handleItemOpen, ...props } = this.props

    return (
      <FlatList
        removeClippedSubviews
        data={items}
        contentContainerStyle={styles.container}
        numColumns={useCorrect(3, 4, 6)}
        initialNumToRender={12}
        windowSize={32}
        columnWrapperStyle={{
          margin: dimensions.UNIT / 2,
        }}
        renderItem={this.renderCard}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListFooterComponent={() => <View style={{ marginBottom: dimensions.UNIT * 2 }} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    )
  }

}

export default withNavigation(CardList)
