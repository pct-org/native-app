import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import Updater from 'update-react-native-app'

export default class CheckForUpdates extends React.Component {

  componentDidMount() {
    const updater = new Updater({
      repo: 'tripss/popcorn-native',

      onUpdateAvailable: this.onUpdateAvailable,
    })

    updater.checkUpdate()
  }

  onUpdateAvailable = (update) => {
    Alert.alert(
      'Update tip',
      'There is a new version, do you want to update?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Update', onPress: () => update(true) },
      ],
    )
  }

  render() {
    return null
  }
}
