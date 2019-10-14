import React from 'react'
import { Animated, SafeAreaView, StyleSheet } from 'react-native'

import Container from 'components/Container'
import Typography from 'components/Typography'

/**
 * Snackbars provide brief feedback about an operation through a message at the bottom of the screen.
 * Snackbar by default use onSurface color from theme
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/snackbar.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Button, Snackbar } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   state = {
 *     visible: false,
 *   };
 *
 *   render() {
 *     const { visible } = this.state;
 *     return (
 *       <View style={styles.container}>
 *         <Button
 *           onPress={() => this.setState(state => ({ visible: !state.visible }))}
 *         >
 *           {this.state.visible ? 'Hide' : 'Show'}
 *         </Button>
 *         <Snackbar
 *           visible={this.state.visible}
 *           onDismiss={() => this.setState({ visible: false })}
 *           action={{
 *             label: 'Undo',
 *             onPress: () => {
 *               // Do something
 *             },
 *           }}
 *         >
 *           Hey there! I'm a Snackbar.
 *         </Snackbar>
 *       </View>
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'space-between',
 *   },
 * });
 * ```
 */
class Snackbar extends React.Component {
  /**
   * Show the Snackbar for a short duration.
   */
  static DURATION_SHORT = 4000

  /**
   * Show the Snackbar for a medium duration.
   */
  static DURATION_MEDIUM = 7000

  /**
   * Show the Snackbar for a long duration.
   */
  static DURATION_LONG = 10000

  static defaultProps = {
    duration: Snackbar.DURATION_MEDIUM,
  }

  state = {
    opacity: new Animated.Value(0.0),
    hidden: !this.props.visible,
  }

  componentDidMount() {
    if (this.props.visible) {
      this._show()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      this._toggle()
    }
  }

  componentWillUnmount() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
  }

  _toggle = () => {
    if (this.props.visible) {
      this._show()
    } else {
      this._hide()
    }
  }

  _show = () => {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
    this.setState({
      hidden: false,
    })
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        const { duration } = this.props
        const isInfinity =
          duration === Number.POSITIVE_INFINITY ||
          duration === Number.NEGATIVE_INFINITY

        if (finished && !isInfinity) {
          this._hideTimeout = setTimeout(this.props.onDismiss, duration)
        }
      }
    })
  }

  _hide = () => {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ hidden: true })
      }
    })
  }

  _hideTimeout

  render() {
    const { children, visible, action, theme, style } = this.props
    const { colors, roundness } = theme

    if (this.state.hidden) {
      return null
    }

    return (
      <SafeAreaView
        pointerEvents="box-none"
        style={styles.wrapper}>
        <Container
          style={
            [
              styles.container,
              {
                borderRadius: roundness,
                opacity: this.state.opacity,
                transform: [
                  {
                    scale: visible
                      ? this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                      : 1,
                  },
                ],
              },
              { backgroundColor: colors.onSurface },
              style,
            ]
          }
        >
          <Typography
            style={[
              styles.content,
              { marginRight: action ? 0 : 16, color: colors.surface },
            ]}
          >
            {children}
          </Typography>
        </Container>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
})

export default Snackbar
