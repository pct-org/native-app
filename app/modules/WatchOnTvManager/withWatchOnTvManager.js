import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import WatchOnTvManagerContext from './WatchOnTvManagerContext'

export const withWatchOnTvManager = Component => hoistNonReactStatics(
  React.forwardRef((props, ref) => (
    <WatchOnTvManagerContext.Consumer>
      {(watchOnTvManager) => (
        <Component
          {...props}
          watchOnTvManager={watchOnTvManager}
          ref={ref} />
      )}
    </WatchOnTvManagerContext.Consumer>
  )),
  Component,
)

export default withWatchOnTvManager
