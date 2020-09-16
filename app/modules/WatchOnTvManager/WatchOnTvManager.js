import constants from 'modules/constants'
import React from 'react'
import { ToastAndroid, AppState } from 'react-native'
import PropTypes from 'prop-types'

import withApollo from 'modules/GraphQL/withApollo'
import { MovieQuery, EpisodeQuery } from 'modules/GraphQL/ItemGraphQL'
import { navigate } from 'modules/RootNavigation'

import Context from './WatchOnTvManagerContext'
import {
  MobileCommandsSubscription,
  TvCommandsSubscription,
  SendCommandToMobile,
  SendCommandToTv,
} from './WatchOnTvQueries'

@withApollo
export default class WatchOnTvManager extends React.Component {

  static propTypes = {
    isTv: PropTypes.bool,
  }

  static defaultProps = {
    isTv: false,
  }

  subscription = null

  state = {
    connected: false,
    isAppActive: false,

    lastCommand: {
      _id: null,
      quality: null,
      itemType: null,
      command: null,
    },
  }

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.subscribeForCommands()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)

    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  subscribeForCommands = async() => {
    const { isTv, apollo } = this.props

    apollo.subscribe({
      query: isTv
        ? TvCommandsSubscription
        : MobileCommandsSubscription,

    }).subscribe({
      next: ({ data }) => {
        this.handleCommand(data.watch.command, data.watch)
      },
    })
  }

  handleAppStateChange = (nextAppState) => {
    const { isTv } = this.props
    const { isAppActive } = this.state

    let nextIsAppActive = nextAppState === 'active'

    if (isAppActive !== nextIsAppActive) {
      this.setState({
        isAppActive: nextIsAppActive,
      })

      // If the next app state is inactive then say the tv is off
      if (isTv && !nextIsAppActive) {
        this.handleTvTurnedOff()

      } else if (isTv && nextIsAppActive) {
        this.handleTvTurnedOn()
      }
    }
  }

  handlePlayItem = async(item, torrent) => {
    const { isTv } = this.props

    if (!isTv) {
      await this.sendCommand('play', {
        _id: item._id,
        itemType: item.type,
        quality: torrent.quality,
        torrentType: torrent.type,
      })
    }
  }

  handleTvCheck = async() => {
    await this.sendCommand('is-tv-on')
  }

  handleTvTurnedOn = async() => {
    await this.sendCommand('tv-is-on')
  }

  handleTvTurnedOff = async() => {
    await this.sendCommand('tv-off')
  }

  handleCommand = async(command, options) => {
    const { apollo, isTv } = this.props
    const { isAppActive, connected } = this.state

    switch (command) {
      case 'is-tv-on':
        if (isTv && isAppActive) {
          await this.sendCommand('tv-is-on')
        }
        break

      case 'tv-is-on':
        console.log('connected')
        ToastAndroid.show('Connected to TV', ToastAndroid.SHORT)

        this.setState({ connected: true })
        break

      case 'tv-off':
        if (connected) {
          ToastAndroid.show('TV disconnected', ToastAndroid.SHORT)

          this.setState({ connected: false })
        }
        break

      case 'play':
        const { data } = await apollo.query({
          variables: {
            _id: options._id,
          },
          query: options.itemType === constants.TYPE_MOVIE
            ? MovieQuery
            : EpisodeQuery,
        })

        navigate('Player', {
          item: data.item,
          torrent: {
            quality: options.quality,
            type: options.torrentType,
          },
        })
    }
  }

  sendCommand = async(command, variables = {}) => {
    const { apollo, isTv } = this.props

    await apollo.mutate({
      variables: isTv
        ? {
          command,
        }
        : {
          _id: '',
          quality: '',
          itemType: '',
          torrentType: '',
          ...variables,
          command,
        },
      mutation: isTv
        ? SendCommandToMobile
        : SendCommandToTv,
    })
  }

  getApi = () => {
    const { connected } = this.state

    return {
      connected,
      isTvOn: this.handleTvCheck,
      playOnTv: this.handlePlayItem,
      tvBooted: this.handleTvTurnedOn,
      tvOff: this.handleTvTurnedOff,
    }
  }

  render() {
    const { children } = this.props

    return (
      <Context.Provider value={this.getApi()}>
        {children}
      </Context.Provider>
    )
  }

}
