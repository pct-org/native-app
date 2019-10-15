import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import DownloadManagerContext from './DownloadManagerContext'

export const withDownloadManager = Component => hoistNonReactStatics(
  React.forwardRef((props, ref) => (
    <DownloadManagerContext.Consumer>
      {downloadManager => (
        <Component{...props} downloadManager={downloadManager} ref={ref} />
      )}
    </DownloadManagerContext.Consumer>
  )),
  Component,
)

export default withDownloadManager
