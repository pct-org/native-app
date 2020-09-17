import React from 'react'

import Context from './FocusManagerContext'

export default Component => React.forwardRef((props, ref) => (
  <Context.Consumer>
    {focusManager => (
      <Component
        {...props}
        focusManager={focusManager}
        ref={ref} />
    )}
  </Context.Consumer>
))
