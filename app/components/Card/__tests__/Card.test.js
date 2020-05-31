import React from 'react'
import { shallow } from 'enzyme'

import Card from '../Card'

describe('(Component) Card', () => {

  const item = {
    images: {
      poster: {
        thumb: 'test-image',
      },
    },
  }

  it('should render with defaults', () => {
    const result = shallow(
      <Card empty />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render variant small with defaults', () => {
    const result = shallow(
      <Card
        variant={'small'}
        empty />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render with images from item', () => {
    const result = shallow(
      <Card item={item} />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render a overlay if the item is watched', () => {
    const result = shallow(
      <Card
        item={{
          ...item,
          watched: {
            complete: true,
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render a overlay if it\'s forced', () => {
    const result = shallow(
      <Card
        forceOverlay
        item={{
          ...item,
          watched: {
            complete: false,
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })

  it('should not render a overlay if it\'s forced but overlayAllowed is false', () => {
    const result = shallow(
      <Card
        overlayAllowed={false}
        forceOverlay
        item={{
          ...item,
          watched: {
            complete: false,
          },
        }}
      />,
    )

    expect(result).toMatchSnapshot()
  })


})
