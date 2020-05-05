import React from 'react'

const navigationRef = React.createRef()

export function navigate(name, params) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params)
  }
}

export default navigationRef
