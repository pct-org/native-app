import colors from 'modules/colors'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import posterHolderImage from 'images/posterholder.png'

import dimensions from 'modules/dimensions'

import BaseButton from '../BaseButton'
import Overlay from '../Overlay'

const styles = StyleSheet.create({

  root: {
    width : dimensions.MY_EPISODE_CARD_WIDTH,
    height: dimensions.MY_EPISODE_CARD_HEIGHT,

    borderRadius   : dimensions.BORDER_RADIUS,
    backgroundColor: colors.BACKGROUND_LIGHTER,
    overflow       : 'hidden',
  },

  image: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'cover',
  },

  placeholderImage: {
    height    : '100%',
    width     : '100%',
    resizeMode: 'center',
  },

})

export default class Card extends React.PureComponent {

  constructor(props) {
    super(props)

    const { item, empty } = props

    this.state = {
      showPlaceholder: empty || !item.images.poster.thumb,
    }
  }

  getAiredDate = (aired) => {
    const airs = new Date()
    airs.setTime(aired)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  handleImageError = () => {
    this.setState({
      showPlaceholder: true,
    })
  }

  getImage = () => {
    const { item, empty } = this.props
    const { showPlaceholder } = this.state

    if (showPlaceholder || empty) {
      return posterHolderImage
    }

    return { uri: item.images.poster.thumb }
  }

  render() {
    const { item, variant, empty, ...rest } = this.props
    const { showPlaceholder } = this.state

    return (
      <BaseButton
        // onLongPress={() => console.warn(item.title)}
        // onPress={() => this.openItem(item)}
        {...rest}>
        <View style={styles.root}>
          <Image
            style={[
              showPlaceholder
                ? styles.placeholderImage
                : styles.image,
            ]}
            source={this.getImage(item)} />

          <Overlay  />

          {/* <View style={styles.episodeContainer}>


           <Icon
           name={'play-circle-outline'}
           color={'#FFF'}
           size={60} />

           <Typography
           style={styles.episodeTitle}
           fontWeight={'bold'}
           variant={'subheading'}>
           {`${item.show.title}: ${item.title}`}
           </Typography>

           <Typography
           fontWeight={'bold'}
           variant={'caption'}>
           {`S${item.season} E${item.number} / ${getAiredDate(item.aired)}`}
           </Typography>
           </View>*/}

        </View>
      </BaseButton>
    )
  }
}
