const { getDefaultConfig } = require('metro-config')
const defaultConfig = getDefaultConfig.getDefaultValues(__dirname)

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'md'],
  },
  transformer: {
    getTransformOptions: async() => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}
