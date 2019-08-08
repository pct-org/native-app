import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import BIconButton from './IconButton'

export const styles = {

  root: {},

  active: {
    borderColor: 'white',
  },
}

export const IconButton = ({ setActive, ...props }) => {
  const [active, toggleActive] = useState(false)

  return (
    <BIconButton
      buttonProps={{
        component: TouchableWithoutFeedback,
        onFocus: () => {
          setActive()
          toggleActive(true)
        },
        onBlur: () => toggleActive(false),
      }}
      {...props}
      animatableStyle={active ? styles.active : {}}
    />
  )
}

export default IconButton
