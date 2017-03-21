import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

const SRC_DIR = path.join(__dirname, '../');

export default {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/dev-server',
    './index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: SRC_DIR,
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }, {
        test: /\.(jpe?g|png|gif|svg|woff|woff2)$/i,
        loader: 'file-loader?name=icons/[name].[ext]',
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
};
