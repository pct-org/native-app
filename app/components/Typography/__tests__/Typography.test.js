import { instanceOf } from 'prop-types'
import React from 'react'
import { shallow } from 'enzyme'

import Typography from '../Typography'

describe('(Component) Typography', () => {

  it('should render with defaults', () => {
    const result = shallow(
      <Typography>test</Typography>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render captionSmall', () => {
    const result = shallow(
      <Typography variant={'captionSmall'}>captionSmall</Typography>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render captionSmall with primary color', () => {
    const result = shallow(
      <Typography
        color={'primary'}
        variant={'captionSmall'}>
        captionSmall - primary color
      </Typography>,
    )

    expect(result).toMatchSnapshot()
  })

  it('should render captionSmall with primary color and high emphasis', () => {
    const result = shallow(
      <Typography
        emphasis={'high'}
        color={'primary'}
        variant={'captionSmall'}>
        captionSmall - primary color
      </Typography>,
    )

    expect(result).toMatchSnapshot()
  })

  describe('Typography.getTextStyle', () => {

    it('should return as array', () => {
      const styles = Typography.getTextStyle({
        variant: 'captionSmall',
        color: 'primary',
      })

      expect(Array.isArray(styles)).toBe(true)
      expect(styles).toEqual(
        [
          { color: '#FECC91' },
          {
            fontFamily: 'Quicksand-Regular',
            fontSize: 10,
            letterSpacing: 0.4,
            lineHeight: 16,
          },
          {
            opacity: 0.87,
          },
        ],
      )
    })

    it('should return as array with all options', () => {
      const styles = Typography.getTextStyle({
        variant: 'captionSmall',
        color: 'primary',
        emphasis: 'medium',
        fontWeight: 'medium',
      })

      expect(Array.isArray(styles)).toBe(true)
      expect(styles).toEqual(
        [
          { color: '#FECC91' },
          {
            fontFamily: 'Quicksand-Regular',
            fontSize: 10,
            letterSpacing: 0.4,
            lineHeight: 16,
          },
          {
            opacity: 0.60,
          },
          {
            fontFamily: 'Quicksand-Medium',
          },
        ],
      )
    })

    it('should return as object', () => {
      const styles = Typography.getTextStyle({
        variant: 'captionSmall',
        color: 'primary',
        asObject: true,
      })

      expect(Array.isArray(styles)).toBe(false)
      expect(styles).toEqual(
        {
          color: '#FECC91',
          fontFamily: 'Quicksand-Regular',
          fontSize: 10,
          letterSpacing: 0.4,
          lineHeight: 16,
          opacity: 0.87,
        },
      )
    })

    it('should return as object with all options', () => {
      const styles = Typography.getTextStyle({
        variant: 'captionSmall',
        color: 'primary',
        emphasis: 'medium',
        fontWeight: 'medium',
        asObject: true,
      })

      expect(Array.isArray(styles)).toBe(false)
      expect(styles).toEqual({
        color: '#FECC91',
        fontSize: 10,
        letterSpacing: 0.4,
        lineHeight: 16,
        opacity: 0.60,
        fontFamily: 'Quicksand-Medium',
      })
    })

  })

})
