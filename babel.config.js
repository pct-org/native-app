module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
  ],

  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true,
      },
    ],

    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',

    [
      'inline-import',
      {
        'extensions': ['.md', '.text', '.txt'],
      },
    ],

    [
      'module-resolver',
      {
        'root': [
          './app',
        ],
      },
    ],
  ],
}
