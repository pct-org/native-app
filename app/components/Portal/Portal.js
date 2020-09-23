import React from 'react'

import PortalConsumer from './PortalConsumer'
import PortalHost, { PortalContext } from './PortalHost'

export const Portal = ({ children }) => (
  <PortalContext.Consumer>
    {(manager) => (
      <PortalConsumer manager={manager}>
        {children}
      </PortalConsumer>
    )}
  </PortalContext.Consumer>
)

Portal.host = PortalHost

export default Portal
