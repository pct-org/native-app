import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'

import Button from 'components/Button'

import withFocusManager from 'tv/modules/FocusManager/withFocusManager'

export class TvHeader extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    const { focusManager } = this.props

    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 125,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Button
            innerRef={ref => focusManager.addRef('btn-home', ref)}
            onPress={() => {}}
            style={{
              marginRight: 20,
            }}
            onFocus={() => focusManager.updateCurrentItem(
              focusManager.constants.HOME_HEADER,
              'btn-home',
              {
                container: focusManager.constants.HOME_HEADER,
                containerTop: null,
                containerBottom: focusManager.constants.HOME_MAIN_COVER_PLAY,
                element: 'btn-home',
                elementLeft: 'btn-shows',
                elementRight: 'btn-bookmarked',
              }
            )}
          >
            HOME
          </Button>

          <Button
            onPress={() => {}}
            innerRef={ref => focusManager.addRef('btn-bookmarked', ref)}
            onFocus={() => focusManager.updateCurrentItem(
              focusManager.constants.HOME_HEADER,
              'btn-bookmarked',
              {
                container: focusManager.constants.HOME_HEADER,
                containerBottom: focusManager.constants.HOME_MAIN_COVER_PLAY,
                element: 'btn-bookmarked',
                elementLeft: 'btn-home',
                elementRight: 'btn-movies',
              }
            )}
            style={{
              marginRight: 20,
            }}>
            Bookmarked
          </Button>

          <Button
            innerRef={ref => focusManager.addRef('btn-movies', ref)}
            onPress={() => {}}
            onFocus={() => focusManager.updateCurrentItem(
              focusManager.constants.HOME_HEADER,
              'btn-movies',
              {
                container: focusManager.constants.HOME_HEADER,
                containerBottom: focusManager.constants.HOME_MAIN_COVER_PLAY,
                element: 'btn-movies',
                elementLeft: 'btn-bookmarked',
                elementRight: 'btn-shows',
              }
            )}
            style={{
              marginRight: 20,
            }}>
            Movies
          </Button>

          <Button
            onPress={() => {}}
            innerRef={ref => focusManager.addRef('btn-shows', ref)}
            onFocus={() => focusManager.updateCurrentItem(
              focusManager.constants.HOME_HEADER,
              'btn-shows',
              {
                container: focusManager.constants.HOME_HEADER,
                containerBottom: focusManager.constants.HOME_MAIN_COVER_PLAY,
                element: 'btn-shows',
                elementLeft: 'btn-movies',
                elementRight: 'btn-home',
              }
            )}>
            Shows
          </Button>
        </View>

      </View>
    )
  }

}

export default withFocusManager(TvHeader)
