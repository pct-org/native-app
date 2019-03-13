export const fontName = 'Roboto'

import colors from 'modules/colors'

export default {

  root: {},

  display5: {
    fontSize  : 22,
    lineHeight: 24,
    letterSpacing: 0.25,
  },

  display4: {
    fontSize  : 26,
    lineHeight: 30,
    letterSpacing: 0.19,
  },

  display3: {
    fontSize  : 56,
    lineHeight: 64,
  },

  display2: {
    fontSize  : 45,
    lineHeight: 52,
  },

  display1: {
    fontSize  : 34,
    lineHeight: 40,
  },

  headline: {
    fontSize  : 24,
    lineHeight: 32,
  },

  title: {
    fontSize  : 20,
    lineHeight: 24,
    letterSpacing: 0.25,
  },

  subheading: {
    fontSize  : 16,
    lineHeight: 24,
  },

  body2: {
    fontSize  : 12,
    lineHeight: 15,
    letterSpacing: 0.21
  },

  body1: {
    fontSize  : 14,
    lineHeight: 20,
  },

  caption: {
    fontSize     : 12,
    lineHeight   : 16,
    letterSpacing: 0.4,
  },

  button: {
    fontSize  : 14,
    lineHeight: 20,
  },

  fontFamilyThin: {
    fontFamily: `${fontName}-Thin`,
  },

  fontFamilyExtraLight: {
    fontFamily: `${fontName}-ExtraLight`,
  },

  fontFamilyLight: {
    fontFamily: `${fontName}-Light`,
  },

  fontFamilyRegular: {
    fontFamily: `${fontName}-Regular`,
  },

  fontFamilyMedium: {
    fontFamily: `${fontName}-Medium`,
  },

  fontFamilyBold: {
    fontFamily: `${fontName}-Bold`,
  },

  fontFamilyBlack: {
    fontFamily: `${fontName}-Black`,
  },

  colorWhite: {
    color: colors.TEXT_COLOR,
  },

  colorBlack: {
    color: 'black',
  },

  emphasisHigh: {},

  emphasisMedium: {
    opacity: 0.6,
  },
}
