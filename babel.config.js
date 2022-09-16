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
          '@common': './src/components/common/',
          '@res': './src/res/',
          '@assets': './src/assets/',
          routes: '.src/routes/',
          '@utils': './src/utils/',
          '@reducers': './src/reducers/',
        },
      },
    ],
  ],
};
