const path = require('path');
const webpack = require('webpack');

const __PRODUCTION__ = process.env.NODE_ENV === 'production';
const __DEV__ = process.env.NODE_ENV === 'development';

const plugins = [
  new webpack.DefinePlugin({
    __DEV__,
    __BASE_URL__: JSON.stringify(process.env.BASE_URL),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
].concat(__PRODUCTION__ ? [
  new webpack.optimize.UglifyJsPlugin({
    screwIE8: true,
  }),
] : []);

module.exports = {
  entry: [
    './src/app.ts',
  ],

  target: 'node',
  watch: __DEV__,

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },

  externals: [
    /^(?!\.|\/).+/i
  ],

  resolve: {
    extensions: ['.js', '.ts'],
  },

  plugins,

  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'awesome-typescript-loader',
      }],
    }],
  },
};
