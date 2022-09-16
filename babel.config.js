module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          '@components': './src/components/',
          '@res': './src/res/',
          '@assets': './src/assets/',
          '@utils': './src/utils/',
          '@screens': './src/screens/',
          '@reducers': './src/reducers/',
          '@repo': './src/repository/',
        },
      },
    ],
  ],
};
