import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: '#292929',
  },

  mainImageContainer: {
    height   : 400,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
  },

  mainImage: {
    height    : '100%',
    width     : '100%',
  },

})

export default class Item extends React.Component {

  render() {
    const { navigation: { state: { params: item } }, isLoading } = this.props

    return (
      <View style={styles.root}>

        <ScrollView>

          <View style={styles.mainImageContainer}>
            <Image
              style={styles.mainImage}
              source={{ uri: item.images.fanart.high }}
            />

          </View>

          {/*<Text>{JSON.stringify(item)}</Text>*/}

        </ScrollView>

      </View>
    )
  }

}
