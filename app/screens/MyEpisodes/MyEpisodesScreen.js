import React from 'react'
import { StyleSheet, View, StatusBar, Image, Dimensions, FlatList, BackHandler, RefreshControl } from 'react-native'
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigationFocus } from 'react-navigation'

import colors from 'modules/colors'
import i18n from 'modules/i18n'

import BaseButton from 'components/BaseButton'
import Typography from 'components/Typography'
import Overlay from 'components/Overlay'
import FullScreenLoading from 'components/FullScreenLoading'
import QualitySelector from 'components/QualitySelector'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: colors.BACKGROUND,
    position       : 'relative',
  },

  episodeContainer: {
    position: 'absolute',
    top     : 0,
    left    : 0,
    right   : 0,
    width   : '100%',
    height  : '100%',

    justifyContent: 'center',
    alignItems    : 'center',
  },

  noItemsContainer: {
    width : '100%',
    height: height,

    justifyContent: 'center',
    alignItems    : 'center',
  },

  episodeImage: {
    width,
    height: height / 3.5,
  },

  episodeTitle: {
    margin      : 8,
    marginBottom: 0,
  },

  noEpisodesText: {
    textAlign: 'center',
    margin   : 16,
  },

})

export class MyEpisodes extends React.PureComponent {

  static getDerivedStateFromProps(props) {
    // If we are not focused cancel the quality selector
    if (!props.isFocused) {
      return {
        selectFromTorrents: null,
        episodeToPlay     : null,
      }
    }

    return {}
  }

  state = {
    selectFromTorrents: null,
    episodeToPlay     : null,
  }

  componentDidMount() {
    Orientation.lockToPortrait()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    const { selectFromTorrents } = this.state

    if (selectFromTorrents !== null) {
      this.setState({
        selectFromTorrents: null,
      })

      return true
    }

    return false
  }

  handleRefresh = () => {
    const { updateMyEpisodes } = this.props

    updateMyEpisodes(true)
  }

  selectQuality = (item) => {
    this.setState({
      selectFromTorrents: item.torrents,
      episodeToPlay     : item,
    })
  }

  cancelQualitySelect = () => {
    this.setState({
      selectFromTorrents: null,
      episodeToPlay     : null,
    })
  }

  playItem = (torrent) => {
    const { navigation: { navigate } } = this.props
    const { episodeToPlay } = this.state

    this.setState({
      selectFromTorrents: null,
    })

    navigate('Player', {
      torrent,
      item: episodeToPlay,
    })
  }

  getAiredDate = (aired) => {
    const airs = new Date()
    airs.setTime(aired)

    return `${airs.getDate()}-${(airs.getMonth() + 1)}-${airs.getFullYear()}`
  }

  renderEpisode = ({ item }) => (
    <View>
      <BaseButton onPress={() => this.selectQuality(item)}>
        <View>
          <Image
            style={styles.episodeImage}
            source={{ uri: item.images.poster.medium }} />

          <View style={styles.episodeContainer}>
            <Overlay style={{ opacity: 0.4 }} />

            <Icon
              name={'play-circle-outline'}
              color={'#FFF'}
              size={60} />

            <Typography
              style={styles.episodeTitle}
              fontWeight={'bold'}
              variant={'subheading'}>
              {`${item.show.title} - ${item.title}`}
            </Typography>

            <Typography
              fontWeight={'bold'}
              variant={'caption'}>
              {`S${item.season} E${item.number} / ${this.getAiredDate(item.aired)}`}
            </Typography>
          </View>

        </View>
      </BaseButton>

      <Typography
        style={{ margin: 8, marginBottom: 16 }}
        variant={'caption'}>
        {item.summary}
      </Typography>
    </View>
  )

  render() {
    const { modes: { myEpisodes: { items, refreshing, fetching } } } = this.props
    const { selectFromTorrents, episodeToPlay } = this.state

    return (
      <View style={styles.root}>

        <StatusBar backgroundColor={'rgba(0, 0, 0, 0.20)'} animated />

        <FullScreenLoading enabled={fetching} />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          removeClippedSubviews
          data={items.length > 0 ? items : null}
          initialNumToRender={4}
          windowSize={8}
          renderItem={this.renderEpisode}
          keyExtractor={(item, index) => item ? item.key : `${index}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.noItemsContainer}>

              <Typography
                style={styles.noEpisodesText}
                variant={'title'}>
                {i18n.t('Episodes aired within the last 7 days from shows you follow will appear here')}
              </Typography>

            </View>
          )}
        />

        <QualitySelector
          item={episodeToPlay
            ? episodeToPlay.show
            : null
          }
          episodeToPlay={episodeToPlay}
          myEpisodesScreen
          cancel={this.cancelQualitySelect}
          torrents={selectFromTorrents}
          playItem={this.playItem} />

      </View>
    )
  }

}

export default withNavigationFocus(MyEpisodes)
