import React, { useState } from 'react'

import BaseMyEpisode from './MyEpisode'

export const styles = {

  active: {
    borderColor: 'white',
  },

}

export const MyEpisode = ({ setActive, ...props }) => {
  const [active, toggleActive] = useState(false)

  return (
    <BaseMyEpisode
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

export default MyEpisode
