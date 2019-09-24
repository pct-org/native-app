import useCorrect from 'modules/useCorrect'

export const fontName = 'Roboto'

import colors from 'modules/colors'

const makeFontSize = (size) => useCorrect(size, size, size - 3)

export default {

  root: {},

  display5: {
    fontSize: makeFontSize(22),
    lineHeight: 24,
    letterSpacing: 0.25,
  },

  display4: {
    fontSize: makeFontSize(26),
    lineHeight: 30,
    letterSpacing: 0.19,
  },

  display3: {
    fontSize: makeFontSize(29),
    lineHeight: 64,
  },

  display2: {
    fontSize: makeFontSize(31),
    lineHeight: 52,
  },

  display1: {
    fontSize: makeFontSize(34),
    lineHeight: 40,
  },

  headline: {
    fontSize: makeFontSize(24),
    lineHeight: 32,
  },

  title: {
    fontSize: makeFontSize(20),
    lineHeight: 24,
    letterSpacing: 0.25,
  },

  body2: {
    fontSize: makeFontSize(12),
    lineHeight: 15,
    letterSpacing: 0.21,
  },

  body1: {
    fontSize: makeFontSize(14),
    lineHeight: 20,
  },

  caption: {
    fontSize: makeFontSize(12),
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  button: {
    fontSize: makeFontSize(14),
    lineHeight: 20,
  },


  seasonTitle: {
    fontSize: makeFontSize(12),
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  episodeTitle: {
    fontSize: makeFontSize(14),
    lineHeight: 24,
  },

  episodeDescription: {
    fontSize: makeFontSize(12),
    lineHeight: 15,
    letterSpacing: 0.21,
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

  colorPrimary: {
    color: colors.PRIMARY_COLOR,
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
