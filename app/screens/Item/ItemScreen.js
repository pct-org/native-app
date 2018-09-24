import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableHighlight, SafeAreaView } from 'react-native'
import Orientation from 'react-native-orientation'

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

  playItem = () => {
    const { navigation: { navigate, state: { params: item } } } = this.props

    navigate('Player', { magnet: item.torrents['1080p'].url })
  }

  componentDidMount() {
    console.log('componentDidMount')
    Orientation.lockToPortrait()
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
  }

  render() {
    const { navigation: { state: { params: item } }, isLoading } = this.props

    return (
      <View style={styles.root}>

        <ScrollViewWithHeader>

          <TouchableHighlight
            onPress={this.playItem}
            style={styles.mainImageContainer}>
            <React.Fragment>
              <Image
                style={styles.mainImage}
                source={{ uri: item.images.fanart.high }}
              />

              <CoverGradient start={{ x: 0, y: 0.80 }} />

              <Typography
                style={styles.title}
                variant={'title'}>{item.title}</Typography>
            </React.Fragment>
          </TouchableHighlight>

          <View style={styles.container}>
            <Typography variant={'body1'}>{item.summary}</Typography>
          </View>

        </ScrollViewWithHeader>

      </View>
    )
  }

}
