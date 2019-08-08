import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import BCard from './Card'

export const styles = {

  root: {},

  active: {
    borderColor: 'white',
  },
}

export const Card = ({ setActive, ...props }) => {
  const [active, toggleActive] = useState(false)

  return (
    <BCard
      component={TouchableWithoutFeedback}
      onFocus={() => {
        setActive()
        toggleActive(true)
      }}
      onBlur={() => toggleActive(false)}
      {...props}
      style={active ? styles.active : {}}
    />
  )
}

export default Card
