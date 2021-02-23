export const fontName = 'Quicksand'
export const fontRegular = `${fontName}-Regular`
export const fontMedium = `${fontName}-Medium`

import colors from 'modules/colors'

export default {

  root: {},

  headline1: {
    fontFamily: fontRegular,
    lineHeight: 122,
    letterSpacing: -1.4,
    fontSize: 96,
  },

  headline2: {
    fontFamily: fontRegular,
    lineHeight: 72,
    letterSpacing: -0.5,
    fontSize: 60,
  },

  headline3: {
    fontFamily: fontRegular,
    lineHeight: 56,
    letterSpacing: 0,
    fontSize: 48,
  },

  headline4: {
    fontFamily: fontRegular,
    lineHeight: 46,
    letterSpacing: 0,
    fontSize: 34,
  },

  headline5: {
    fontFamily: fontRegular,
    lineHeight: 24,
    letterSpacing: 0.18,
    fontSize: 24,
  },

  headline6: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontSize: 20,
  },

  subtitle1: {
    fontFamily: fontRegular,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontSize: 16,
  },

  subtitle2: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 24,
    letterSpacing: 0.10,
    fontSize: 14,
  },

  body1: {
    fontFamily: fontRegular,
    lineHeight: 24,
    letterSpacing: 0.50,
    fontSize: 16,
  },

  body2: {
    fontFamily: fontRegular,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontSize: 14,
  },

  button: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 16,
    letterSpacing: 0.10,
    fontSize: 14,
    textTransform: 'uppercase',
  },

  caption: {
    fontFamily: fontRegular,
    lineHeight: 16,
    letterSpacing: 0.40,
    fontSize: 12,
  },

  captionSmall: {
    fontFamily: fontRegular,
    lineHeight: 16,
    letterSpacing: 0.40,
    fontSize: 10,
  },

  overline: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 16,
    letterSpacing: 1.50,
    fontSize: 12,
    textTransform: 'uppercase',
  },

  fontFamilyRegular: {
    fontFamily: fontRegular,
  },

  fontFamilyMedium: {
    fontFamily: `${fontName}-Medium`,
  },

  colorPrimary: {
    color: colors.PRIMARY_COLOR_200,
  },

  colorPrimaryDark: {
    color: colors.PRIMARY_COLOR_500,
  },

  colorWhite: {
    color: '#ffffff',
  },

  colorBlack: {
    color: 'black',
  },

  emphasisHigh: {
    opacity: 0.87,
  },

  emphasisMedium: {
    opacity: 0.60,
  },

  emphasisLow: {
    opacity: 0.38,
  },

  transformLowercase: {
    textTransform: 'lowercase'
  },

  transformUppercase: {
    textTransform: 'uppercase'
  }
}
