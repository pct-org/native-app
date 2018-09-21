import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableHighlight } from 'react-native'

import ScrollViewWithHeader from 'components/ScrollViewWithHeader'
import CoverGradient from 'components/CoverGradient'
import Typography from 'components/Typography'

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
    height: '100%',
    width : '100%',
  },

  container: {
    margin: 10,
  },

  title: {
    position: 'absolute',
    bottom  : 20,
    left    : 10,
  },

})

export default class Item extends React.Component {

  render() {
    const { navigation: { state: { params: item } }, isLoading } = this.props

    return (
      <View style={styles.root}>

        <ScrollViewWithHeader>

          <View style={styles.mainImageContainer}>
            <Image
              style={styles.mainImage}
              source={{ uri: item.images.fanart.high }}
            />

            <CoverGradient start={{ x: 0, y: 0.80 }} />

            <Typography
              style={styles.title}
              variant={'title'}>{item.title}</Typography>
          </View>

          <View style={styles.container}>
            <Typography variant={'body1'}>{item.summary}</Typography>
          </View>

        </ScrollViewWithHeader>

      </View>
    )
  }

}
