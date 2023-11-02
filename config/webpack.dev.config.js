const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  devServer: {
    watchFiles: baseWebpackConfig.externals.paths.src,
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    ...baseWebpackConfig.externals.paths.pages.map((page) => {
      return new HtmlWebpackPlugin({
        template: `${baseWebpackConfig.externals.paths.pagesDir}/${page}`,
        filename: `${page.replace(/\.pug/, '.html')}`,
        production: false,
      });
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
