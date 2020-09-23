export const fontName = 'Quicksand'
export const fontRegular = `${fontName}-Regular`
export const fontMedium = `${fontName}-Medium`

import colors from 'modules/colors'
import dimensions from 'modules/dimensions'

export default {

  root: {},

  headline5: {
    fontFamily: fontRegular,
    lineHeight: dimensions.getWidth(110),
    letterSpacing: -1,
    fontSize: dimensions.getWidth(110),
  },

  headline6: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontSize: 20,
  },

  subtitle1: {
    fontFamily: fontRegular,
    lineHeight: dimensions.getWidth(48),
    letterSpacing: dimensions.getWidth(-0.4),
    fontSize: dimensions.getWidth(48),
  },

  subtitle2: {
    fontFamily: `${fontName}-Medium`,
    lineHeight: 16,
    letterSpacing: 0.10,
    fontSize: 16,
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
    lineHeight: 14,
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

}
