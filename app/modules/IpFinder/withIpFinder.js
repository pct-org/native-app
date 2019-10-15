import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import IpFinderContext from './IpFinderContext'

export const withIpFinder = Component => hoistNonReactStatics(
  React.forwardRef((props, ref) => (
    <IpFinderContext.Consumer>
      {ipFinder => (
        <Component{...props} ipFinder={ipFinder} ref={ref} />
      )}
    </IpFinderContext.Consumer>
  )),
  Component,
)

export default withIpFinder
