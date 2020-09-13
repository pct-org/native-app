import React, { useState } from 'react'

import BCard from './Card'

export const styles = {

  root: {},

  active: {},
}

export const Card = ({ setActive, ...props }) => {
  const [active, toggleActive] = useState(false)

  return (
    <BCard
      onFocus={setActive
        ? () => {
          setActive()
          toggleActive(true)
        }
        : undefined
      }
      onBlur={
        setActive
          ? () => toggleActive(false)
          : undefined
      }
      {...props}
      style={{
        ...styles.root,
        ...(active ? styles.active : {}),
      }}
    />
  )
}

export default Card
