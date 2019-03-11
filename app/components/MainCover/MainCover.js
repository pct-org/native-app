import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Constants } from 'popcorn-sdk'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

import CoverGradient from '../CoverGradient'
import BaseButton from '../BaseButton'
import Typography from '../Typography'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({

  mainContainer: {
    position: 'relative',
  },

  listContainer: {
    height   : height * 0.45,
    width    : '100%',
    alignSelf: 'stretch',
    position : 'relative',
    display  : 'flex',
  },

  image: {
    height: '100%',
    width : '100%',
  },

  playContainer: {
    position: 'absolute',
    top     : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  info: {
    position  : 'absolute',
    bottom    : 0,
    marginLeft: dimensions.UNIT * 2,
  },

  genres: {
    marginTop   : dimensions.UNIT / 2,
    marginBottom: dimensions.UNIT / 2,
  },

  infoContainer: {
    marginTop   : dimensions.UNIT / 2,
    marginLeft  : dimensions.UNIT * 2,
    marginBottom: dimensions.UNIT * 2,
  },

})

export const MainCover = ({ item, onPress, onLoad }) => {
  if (!item) {
    return null
  }

  const genres = [...item.genres].splice(0, 4)

  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        <BaseButton onPress={() => console.log('play')}>
          <View style={styles.listContainer}>

            <Image
              style={styles.image}
              source={{ uri: item.images.fanart.high }}
              onLoad={onLoad}
              onError={onLoad}
            />

            <CoverGradient start={{ x: 0, y: 0.1 }} />

            {item && item.type === Constants.TYPE_MOVIE && (
              <View style={styles.playContainer}>
                <Icon
                  name={'play-circle-outline'}
                  color={colors.ICON_COLOR}
                  size={50} />
              </View>
            )}

          </View>
        </BaseButton>

        <View style={styles.info}>
          <Typography variant={'display4'}>
            {item.title}
          </Typography>

          <Typography
            style={styles.genres}
            variant={'caption'}
            emphasis={'medium'}>
            {genres.join(' - ')}
          </Typography>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Typography
          style={{ width: '85%' }}
          variant={'body2'}
          textProps={{
            numberOfLines: 3,
            ellipsizeMode: 'tail',
          }}>
          {item.summary}
        </Typography>
      </View>
    </React.Fragment>
  )
}

MainCover.propTypes = {
  item    : PropTypes.object,
  onPress : PropTypes.func.isRequired,
  onLoad  : PropTypes.func.isRequired,
  children: PropTypes.node,
}

MainCover.defaultProps = {
  item    : null,
  children: null,
}

export default MainCover
